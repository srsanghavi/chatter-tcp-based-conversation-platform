package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.ModelFactory;

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
}
