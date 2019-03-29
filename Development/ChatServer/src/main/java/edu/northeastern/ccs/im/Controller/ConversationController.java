package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.database.MysqlCon;
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
    ConversationModel conversationModel = ModelFactory.getInstance().getConversationModel();

    /**
     * Gets user conversations.
     *
     * @param json the json
     * @return the user conversations
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getUserConversations(Map<String,Object> json) throws NoSuchFieldException {
        int user_id;
        if(json.containsKey("user_id")) {
            user_id = Math.toIntExact(Math.round((double) json.get("user_id")));
        }else {
            throw new NoSuchFieldException();
        }
        return conversationModel.getConversations(user_id);
    }

    /**
     * Gets threads in conversation.
     *
     *
     * @param username
     * @param json the json
     * @return the threads in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getThreadsInConversation(String username, Map<String, Object> json) throws NoSuchFieldException {

        if(!json.containsKey("conversation_id")) {
            throw new NoSuchFieldException();
        }

        int conversation_id;
        conversation_id = Math.toIntExact(Math.round((double) json.getOrDefault("conversation_id", 0)));
        if(!isConversationParticipant(username,conversation_id)){
            return error401();
        }

        return conversationModel.getThreadsForConversation(Integer.valueOf(conversation_id));

    }

    /**
     * Gets messages in conversation.
     *
     * @param json the json
     * @return the messages in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getMessagesInConversation(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey("conversation_id")) {
            throw new NoSuchFieldException();
        }
        int conversationId;
        conversationId = Math.toIntExact(Math.round((double) json.getOrDefault("conversation_id", 0)));

        if(!isConversationParticipant(username,conversationId)){
            return error401();
        }

        return conversationModel.getMessagesForConversation(Integer.valueOf(conversationId));
    }


    /**
     * Gets users in conversation.
     *
     * @param json the json
     * @return the users in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getUsersInConversation(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(json.containsKey("conversation_id")) {
            throw new NoSuchFieldException();
        }
        int conversationId = Math.toIntExact(Math.round((double) json.getOrDefault("conversation_id", 0)));

        if(!isConversationParticipant(username,conversationId)){
            return error401();
        }
        return conversationModel.getUsersInConversation(Integer.valueOf(conversationId));
    }

    /**
     * Gets messages in thread.
     *
     * @param json the json
     * @return the messages in thread
     * @throws NoSuchFieldException the no such field exception
     */

    public List<Map<String,Object>> getMessagesInThread(String username,Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey("thread_id")) {
            throw new NoSuchFieldException();
        }

        int threadId = Math.toIntExact(Math.round((double) json.getOrDefault("thread_id", 0)));
        List<Map<String, Object>> thread = conversationModel.getThread(threadId);
        System.out.println(thread);
        if(thread.get(0).isEmpty() || !thread.get(0).containsKey("conversations_id")){
            return error400();
        }
        int conversationId = (int) thread.get(0).get("conversations_id");

        if(!isConversationParticipant(username,conversationId)){
            return error401();
        }

        return conversationModel.getMessagesInThread(Integer.valueOf(threadId));
    }

  /**
   * Create a conversation between User and User.
   * @param json the json
   * @return the json object
   */
    public Map<String, Object> createUserUserConversation(Map<String,Object> json){
      if(!json.containsKey("user_id1") ||
              !json.containsKey("user_id2")){
        json.put("result_code",400);
        json.put("result","error");
        json.put("error_message","Missing parameter");
        return json;
      }

      int user1 = Math.toIntExact(Math.round((double) json.get("user_id1")));
      int user2 = Math.toIntExact(Math.round((double) json.get("user_id2")));

      int r = ModelFactory.getConversationModel().createConversationForUser(user1,user2);
      if(r>0){
        json.put("result_code",201);
        json.put("result","OK");
        return json;
      }else {
        return error500(json);
      }
    }

    /**
     * Create message map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String, Object> createMessage(Map<String,Object> json) {
        if(!json.containsKey("sender_id") ||
        !json.containsKey("thread_id") ||
        !json.containsKey("message") ||
        !json.containsKey("conversation_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        int senderId = Math.toIntExact(Math.round((double) json.get("sender_id")));
//        int destinatonId = Math.toIntExact(Math.round((double) json.get("destination_id")));
        int conversationId = Math.toIntExact(Math.round((double) json.get("conversation_id")));

        Map<String, Object> sender = ModelFactory.getUserModel().getUser((senderId));
//        Map<String, Object> destination = ModelFactory.getUserModel().getUser((destinatonId));

        String senderName = (String) sender.get("username");
//        String destinationName = (String) destination.get("username");

        int threadId = Math.toIntExact(Math.round((double) json.get("thread_id")));
        String message = (String) json.get("message");

        if(threadId==-1){
            if(conversationModel.createThreadForConversation(conversationId)>0){
                threadId = conversationModel.getLastInsertedID();
            }else {
                return error500(json);
            }
        }

        List<Map<String, Object>> users = conversationModel.getUsersInConversation(conversationId);
        List<String> destinationNames = new ArrayList<>();
        for(Map<String,Object> user:users){
            if(user.containsKey("username") &&
                user.get("username")!=senderName){
                destinationNames.add((String) user.get("username"));
            }
        }

        String data = "{\"sender_name\":\""+senderName+"\",\"message\":\""+message+"\"}";
        if(conversationModel.createMessageForThread(Integer.valueOf(threadId),Integer.valueOf(senderId),message)>0){
            Message msg = Message.makeNotificationMessage(senderName,data);
            for(String destinationName:destinationNames) {
                Prattle.sendMessageToUser(destinationName, msg);
            }
            json.put("result_code",201);
            json.put("result","OK");
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
        if(!json.containsKey("thread_id") ||
            !json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String threadId = (String) json.get("thread_id");
        String groupId = (String) json.get("group_id");
        if(conversationModel.createThreadForConversationByThreadID(Integer.valueOf(threadId),Integer.valueOf(groupId))>0){
            json.put("result_code",201);
            json.put("result","OK");
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
        String messageId = (String) json.get("message_id");
        if(ModelFactory.getMessageModel().deleteMessage(Integer.valueOf(messageId)) > 0){
            json.put("result_code",201);
            json.put("result","OK");
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
        if(!json.containsKey("message") ||
        !json.containsKey("sender_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String text = (String) json.get("message");
        int sender = Math.toIntExact(Math.round((double) json.get("sender_id")));
        List<Map<String, Object>> conversations = conversationModel.getConversations(sender);
        int conversation_id = -1;
        int thread_id = -1;
        int message_id = -1;
        for (Map<String, Object> conversation : conversations){
            conversation_id = (Integer) conversation.get("id");
            thread_id = conversationModel.createThreadForConversation(conversation_id);
            message_id = conversationModel.createMessageForThread(thread_id, sender, text);
            conversationModel.addMessageToThread(message_id, thread_id);
        }
        json.put("result_code",201);
        json.put("result","OK");
        return json;
    }
    private Map<String, Object> error500(Map<String,Object> json){
        json.put("result_code",500);
        json.put("result","error");
        json.put("result_message","Could not create a message");
        return json;
    }

    private List<Map<String, Object>> error401(){
        Map<String,Object> json = new HashMap<>();
        json.put("result_code",401);
        json.put("result","error");
        json.put("result_message","User not authorized");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }

    private List<Map<String, Object>> error400(){
        Map<String,Object> json = new HashMap<>();
        json.put("result_code",400);
        json.put("result","error");
        json.put("result_message","Content not found");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }

    private Boolean isConversationParticipant(String username, int conversationId){
        int userId = ModelFactory.getUserModel().getUserID(username);

        List<Map<String, Object>> conversations = conversationModel.getConversations(userId);

        for(Map<String,Object> c:conversations) {
            if (!conversations.isEmpty() &&
                    conversations.get(0).containsKey("id") &&
                    ((int) conversations.get(0).get("id") == conversationId)){
                return true;
            }
        }
        return false;
    }
}
