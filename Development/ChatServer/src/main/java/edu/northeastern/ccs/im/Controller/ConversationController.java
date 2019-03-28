package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.server.Prattle;

import java.util.List;
import java.util.Map;

/**
 * The type Conversation controller.
 */
public class ConversationController {
    /**
     * The Conversation model.
     */
    ConversationModel conversationModel = ModelFactory.getConversationModel();

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
     * @param json the json
     * @return the threads in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getThreadsInConversation(Map<String,Object> json) throws NoSuchFieldException {
        int conversation_id;
        if(json.containsKey("conversation_id")) {
            conversation_id = Math.toIntExact(Math.round((double) json.getOrDefault("conversation_id", 0)));
        }else {
            throw new NoSuchFieldException();
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
    public List<Map<String,Object>> getMessagesInConversation(Map<String,Object> json) throws NoSuchFieldException {
        String conversationId;
        if(json.containsKey("conversation_id")) {
            conversationId = (String) json.getOrDefault("conversation_id", 0);
        }else {
            throw new NoSuchFieldException();
        }
        return ConversationModel.getMessagesForConversation(Integer.valueOf(conversationId));
    }

    /**
     * Gets users in conversation.
     *
     * @param json the json
     * @return the users in conversation
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getUsersInConversation(Map<String,Object> json) throws NoSuchFieldException {
        int conversationId;
        if(json.containsKey("conversation_id")) {
            conversationId = Math.toIntExact(Math.round((double) json.getOrDefault("conversation_id", 0)));
        }else {
            throw new NoSuchFieldException();
        }
        return ConversationModel.getUsersInConversation(Integer.valueOf(conversationId));
    }

    /**
     * Gets messages in thread.
     *
     * @param json the json
     * @return the messages in thread
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String,Object>> getMessagesInThread(Map<String,Object> json) throws NoSuchFieldException {
        String threadId;
        if(json.containsKey("thread_id")) {
            threadId = (String) json.getOrDefault("thread_id", 0);
        }else {
            throw new NoSuchFieldException();
        }
        return ConversationModel.getMessagesInThread(Integer.valueOf(threadId));
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

      String user1 = (String) json.get("user_id1");
      String user2 = (String) json.get("user_id2");

      int r = ConversationModel.createConversationForUser(Integer.valueOf(user1),Integer.valueOf(user2));
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
        !json.containsKey("destionation_id") ||
        !json.containsKey("thread_id") ||
        !json.containsKey("message")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String senderId = (String) json.get("sender_id");
        String destinatonId = (String) json.get("destinationId");

        Map<String, Object> sender = ModelFactory.getUserModel().getUser(Integer.parseInt(senderId));
        Map<String, Object> destination = ModelFactory.getUserModel().getUser(Integer.parseInt(destinatonId));

        String senderName = (String) sender.get("username");
        String destinationName = (String) destination.get("username");

        String threadId = (String) json.get("thread_id");
        String message = (String) json.get("message");

        String data = "{\"sender_name\":\""+senderName+"\",\"message\":\""+message+"\"}";
        if(ConversationModel.createMessageForThread(Integer.valueOf(threadId),Integer.valueOf(senderId),message)>0){
            Message msg = Message.makeNotificationMessage(senderName,data);
            Prattle.sendMessageToUser(destinationName,msg);
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
        if(ConversationModel.createThreadForConversationByThreadID(Integer.valueOf(threadId),Integer.valueOf(groupId))>0){
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
        List<Map<String, Object>> conversations = ConversationModel.getConversations(sender);
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
}
