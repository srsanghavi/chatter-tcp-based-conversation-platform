package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.server.Prattle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Conversation controller.
 */
public class ConversationController {
    /**
     * The Conversation model.
     */
    private ConversationModel conversationModel = ModelFactory.getConversationModel();
    private static String CONVERSATION_ID = "conversation_id";
    private static String THREAD_ID = "thread_id";
    private static String MESSAGE = "message";
    private static String USER_ID = "user_id";
    private static String RESULT_CODE = "result_code";
    private static String CONVERSATIONS_ID = "conversations_id";
    private static String RESULT = "result";
    private static String ERROR = "error";
    private static String ERROR_MESSAGE = "error_message";
    private static String MISSING_PARAMETER = "Missing parameter";
    private static String SENDER_ID = "sender_id";
    private static String USERNAME = "username";
    private static String RESULT_MESSAGE = "result_message";

    /**
     * Gets user conversations.
     *
     * @param json the json
     * @return the user conversations
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getUserConversations(Map<String,Object> json) throws NoSuchFieldException {
        int userId;
        if(json.containsKey(USER_ID)) {
            userId = Math.toIntExact(Math.round((double) json.get(USER_ID)));
        }else {
            throw new NoSuchFieldException();
        }
        return conversationModel.getConversations(userId);
    }

    /**
     * Gets threads in conversation.
     *
     * @param username the username of the client user
     * @param json     the json
     * @return the threads in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getThreadsInConversation(String username, Map<String, Object> json) throws NoSuchFieldException {

        if(!json.containsKey(CONVERSATION_ID)) {
            throw new NoSuchFieldException();
        }

        int conversationId;
        conversationId = Math.toIntExact(Math.round((double) json.getOrDefault(CONVERSATION_ID, 0)));
        if(!isConversationParticipant(username,conversationId)){
            return error401();
        }

       return conversationModel.getThreadsForConversation(conversationId);
    }

    /**
     * Gets messages in conversation.
     *
     * @param username the username
     * @param json     the json
     * @return the messages in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getMessagesInConversation(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey(CONVERSATION_ID)) {
            throw new NoSuchFieldException();
        }
        int conversationId;
        conversationId = Math.toIntExact(Math.round((double) json.getOrDefault(CONVERSATION_ID, 0)));

        if(!isConversationParticipant(username,conversationId) && !groupConversation(conversationId)){
            return error401();
        }

        return conversationModel.getMessagesForConversation(conversationId);
    }

    private boolean groupConversation(int conversationId) {
        List<Map<String, Object>> res = ModelFactory.getConversationModel().getConversationGroup(conversationId);
        return res.size()>0;
    }


    /**
     * Gets users in conversation.
     *
     * @param username the username
     * @param json     the json
     * @return the users in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getUsersInConversation(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey(CONVERSATION_ID)) {
            throw new NoSuchFieldException();
        }
        int conversationId = Math.toIntExact(Math.round((double) json.getOrDefault(CONVERSATION_ID, 0)));

        if(!isConversationParticipant(username,conversationId)){
            return error401();
        }
        return conversationModel.getUsersInConversation(conversationId);
    }

    /**
     * Gets messages in thread.
     *
     * @param username the username
     * @param json     the json
     * @return the messages in thread
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getMessagesInThread(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey(THREAD_ID)) {
            throw new NoSuchFieldException();
        }

        int threadId = Math.toIntExact(Math.round((double) json.getOrDefault(THREAD_ID, 0)));
        List<Map<String, Object>> thread = conversationModel.getThread(threadId);
        if(thread.get(0).isEmpty() || !thread.get(0).containsKey(CONVERSATIONS_ID)){
            return error400();
        }
        int conversationId = (int) thread.get(0).get(CONVERSATIONS_ID);

        if(!isConversationParticipant(username,conversationId) && !groupConversation(conversationId)){
            return error401();
        }

        return conversationModel.getMessagesInThread(threadId);
    }

    /**
     * Create a conversation between User and User.
     *
     * @param json the json
     * @return the json object
     */
    public Map<String, Object> createUserUserConversation(Map<String,Object> json){
      if(!json.containsKey("user_id1") ||
              !json.containsKey("user_id2")){
        json.put(RESULT_CODE, 400);
        json.put(RESULT, ERROR);
        json.put(ERROR_MESSAGE, MISSING_PARAMETER);
        return json;
      }

      int user1 = Math.toIntExact(Math.round((double) json.get("user_id1")));
      int user2 = Math.toIntExact(Math.round((double) json.get("user_id2")));

      int r = ModelFactory.getConversationModel().createConversationForUser(user1,user2);
      if(r>0){
        json.put(RESULT_CODE, 201);
        json.put(RESULT, "OK");
        return json;
      }else {
        return error500(json);
      }
    }

    /**
     * Create message
     *
     * @param json the json
     * @return the map
     *
     * thread_id in JSON should be -1 if new thread needs to be created
     */
    public Map<String, Object> createMessage(Map<String,Object> json) {
        if(!json.containsKey(SENDER_ID) ||
        !json.containsKey(THREAD_ID) ||
        !json.containsKey(MESSAGE) ||
        !json.containsKey(CONVERSATION_ID)){
            json.put(RESULT_CODE,400);
            json.put(RESULT,ERROR);
            json.put(ERROR_MESSAGE, MISSING_PARAMETER);
            return json;
        }
        int senderId = Math.toIntExact(Math.round((double) json.get(SENDER_ID)));
        int conversationId = Math.toIntExact(Math.round((double) json.get(CONVERSATION_ID)));

        Map<String, Object> sender = ModelFactory.getUserModel().getUser((senderId));

        String senderName = (String) sender.get(USERNAME);

        int threadId = Math.toIntExact(Math.round((double) json.get(THREAD_ID)));
        String message = (String) json.get(MESSAGE);

        if(threadId==-1){
            if(conversationModel.createThreadForConversation(conversationId)>0){
                threadId = conversationModel.getLastInsertedID();
            }else {
                return error500(json);
            }
        }
        List<String> destinationNames = new ArrayList<>();

        if(groupConversation(conversationId)){
            List<Map<String, Object>> res = ModelFactory.getConversationModel().getConversationGroup(conversationId);
            int groupId = (int) res.get(0).get("id");
            List<Map<String, Object>> users = ModelFactory.getGroupModel().getUsersInGroups(groupId);
            for (Map<String, Object> user : users) {
                if (user.containsKey(USERNAME) &&
                        !user.get(USERNAME).equals(senderName)) {
                    destinationNames.add((String) user.get(USERNAME));
                }
            }
            System.out.println(destinationNames);
        }else {
            List<Map<String, Object>> users = conversationModel.getUsersInConversation(conversationId);
            for (Map<String, Object> user : users) {
                if (user.containsKey(USERNAME) &&
                            !user.get(USERNAME).equals(senderName)) {
                    destinationNames.add((String) user.get(USERNAME));
                }
            }
        }

        String data = "{\"sender_name\":\""+senderName+"\",\"message\":\""+message+"\",\"conversation_id\":"+conversationId+"}";
        if(conversationModel.createMessageForThread(threadId, senderId,message)>0){
            Message msg = Message.makeNotificationMessage(senderName,data);
            for(String destinationName:destinationNames) {
                Prattle.sendMessageToUser(destinationName, msg);
            }
            json.put(RESULT_CODE,201);
            json.put(RESULT,"OK");
            return json;
        }else {
            return error500(json);
        }
    }

    /**
     * Create thread map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> createThread(Map<String,Object> json){
        if(!json.containsKey(THREAD_ID) ||
            !json.containsKey(CONVERSATION_ID)){
            json.put(RESULT_CODE,400);
            json.put(RESULT, ERROR);
            json.put(ERROR_MESSAGE, MISSING_PARAMETER);
            return json;
        }
        int threadId = Math.toIntExact(Math.round((double) json.get(THREAD_ID)));
        int conversationId = Math.toIntExact(Math.round((double) json.get(CONVERSATION_ID)));
        if(conversationModel.createThreadForConversationByThreadID(threadId,conversationId)>0){
            json.put(RESULT_CODE,201);
            json.put(RESULT,"OK");
            return json;
        }else {
            return error500(json);
        }
    }

    /**
     * Delete message map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> deleteMessage(Map<String,Object> json){
        int messageId = Math.toIntExact(Math.round((double) json.get("message_id")));
        if(ModelFactory.getMessageModel().deleteMessage(messageId) > 0){
            json.put(RESULT_CODE,201);
            json.put(RESULT,"OK");
            return json;
        }
        else
            return error500(json);
    }

    /**
     * Broad cast message map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String, Object> broadCastMessage(Map<String,Object> json){
        if(!json.containsKey(MESSAGE) ||
        !json.containsKey(SENDER_ID)){
            json.put(RESULT_CODE,400);
            json.put(RESULT,"error");
            json.put(ERROR_MESSAGE,"Missing parameter");
            return json;
        }
        String text = (String) json.get(MESSAGE);
        int sender = Math.toIntExact(Math.round((double) json.get(SENDER_ID)));
        List<Map<String, Object>> conversations = conversationModel.getConversations(sender);
        int conversationId;
        int threadId;
        int messageId;
        for (Map<String, Object> conversation : conversations){
            conversationId = (Integer) conversation.get("id");
            threadId = conversationModel.createThreadForConversation(conversationId);
            messageId = conversationModel.createMessageForThread(threadId, sender, text);
            conversationModel.addMessageToThread(messageId, threadId);
        }
        json.put(RESULT_CODE,201);
        json.put(RESULT,"OK");
        return json;
    }
    private Map<String, Object> error500(Map<String,Object> json){
        json.put(RESULT_CODE,500);
        json.put(RESULT,ERROR);
        json.put(RESULT_MESSAGE,"Could not create a message");
        return json;
    }

    private List<Map<String, Object>> error401(){
        Map<String,Object> json = new HashMap<>();
        json.put(RESULT_CODE,401);
        json.put(RESULT,ERROR);
        json.put(RESULT_MESSAGE,"User not authorized");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }

    private List<Map<String, Object>> error400(){
        Map<String,Object> json = new HashMap<>();
        json.put(RESULT_CODE,400);
        json.put(RESULT,ERROR);
        json.put(RESULT_MESSAGE,"Content not found");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }

    private Boolean isConversationParticipant(String username, int conversationId){
        int userId = ModelFactory.getUserModel().getUserID(username);

        List<Map<String, Object>> conversations = conversationModel.getConversations(userId);

        for(Map<String,Object> c:conversations) {
            if(!conversations.isEmpty() &&
                    c.containsKey("id") &&
                    ((int) c.get("id") == conversationId)){
                return true;
            }
        }
        return false;
    }


    public List<Map<String, Object>> getGroupConversations(Map<String,Object> json) throws NoSuchFieldException {
        int userId;
        if(json.containsKey(USER_ID)) {
            userId = Math.toIntExact(Math.round((double) json.get(USER_ID)));
        }else {
            throw new NoSuchFieldException();
        }
        return conversationModel.getGroupConversations(userId);
    }

}
