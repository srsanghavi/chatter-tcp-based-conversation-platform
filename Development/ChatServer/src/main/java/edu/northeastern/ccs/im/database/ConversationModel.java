package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.util.*;


/**
 * The type Conversation model.
 */
public class ConversationModel {
    /**
     * The Mysql con.
     */
    DataCon conn;

    /**
     * Instantiates a new Conversation db.
     *
     * @param dataConnection the data connection
     */
    public ConversationModel(DataCon dataConnection){
        conn = dataConnection.getInstance();
    }

    /**
     * Create conversation for user int.
     *
     * @param userid1 the userid 1
     * @param userid2 the userid 2
     * @return the int (1 if conversation is created, -1 otherwise)
     */
    public int createConversationForUser(int userid1,int userid2){
        int conversationId = getUserUserConversation(userid1,userid2);
        if(conversationId<0){
            String createConvQuery = "SELECT user_user_conversation(?, ?) as conversations_id";
            List<String> args = new ArrayList<>();
            Collections.addAll(args, Integer.toString(userid1), Integer.toString(userid2));
            List<Map<String, Object>> r = conn.sqlGet(createConvQuery, args);
            if(!r.isEmpty()){
                conversationId = (int) r.get(0).get("conversations_id");
            }else {
                conversationId = -1;
            }
        }
        return conversationId;
    }

    /**
     *
     * @param id1
     * @param id2
     * @return int id of the conversation
     */
    private int getUserUserConversation(int id1,int id2) {
        String query = "select conversations_id from users_converses_users where (users_id=? and users_id1=?) or ( users_id=? and users_id1=?)";

        List<String> args = new ArrayList<>();
        Collections.addAll(args, Integer.toString(id1), Integer.toString(id2), Integer.toString(id2), Integer.toString(id1));
        List<Map<String, Object>> rs = conn.sqlGet(query, args);
        if(!rs.isEmpty()){
            return (int) rs.get(0).get("Conversations_id");
        }else {
            return -1;
        }
    }


    /**
     * Create thread for conversation int.
     *
     * @param conversationId the conversation id
     * @return the int (1 if thread is created, -1 o.w.)
     */
    public int createThreadForConversation(int conversationId){
        String query = "INSERT INTO thread(conversations_id) VALUES (?);";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(conversationId));
        int r = conn.sqlcreate(query, args);
        if(r>0){
            return conn.getLastInsertedID();
        }
        return -1;
    }


    /**
     * Create thread for conversation by thread id int.
     *
     * @param threadId       the thread id
     * @param conversationId the conversation id
     * @return the int
     */
    public int createThreadForConversationByThreadID(int threadId, int conversationId){
    String query = "INSERT INTO thread(id,conversations_id) VALUES (?, ?)";
    List<String> args = new ArrayList<>();
    Collections.addAll(args, Integer.toString(threadId), Integer.toString(conversationId));
    int r = conn.sqlcreate(query, args);
    if(r>0){
      return conn.getLastInsertedID();
    }
    return -1;
  }


    /**
     * Get threads for conversation list.
     *
     * @param conversationId the conversation id
     * @return the list of threads
     */
    public List<Map<String,Object>> getThreadsForConversation(int conversationId){
        String query = "SELECT * FROM thread WHERE conversations_id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(conversationId));
        return conn.sqlGet(query, args);
    }

    /**
     * Create message for thread int.
     *
     * @param threadId the thread id
     * @param senderId the sender id
     * @param text     the text
     * @return the int
     */
    public int createMessageForThread(int threadId, int senderId, String text){
        String query = "INSERT INTO message(sender_id,thread_id,text) VALUES (?, ?, ?);";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, Integer.toString(senderId), Integer.toString(threadId), text);
        int r = conn.sqlcreate(query, args);
        if(r>0){
            return conn.getLastInsertedID();
        }
        return -1;
    }

    /**
     * Add message to thread int.
     *
     * @param messageID the message id
     * @param threadId  the thread id
     * @return the int
     */
    public int addMessageToThread(int messageID, int threadId){
      String query = "UPDATE message SET thread_id =? WHERE id=?;";
      List<String> args = new ArrayList<>();
      Collections.addAll(args, Integer.toString(threadId), Integer.toString(messageID));
      int r = conn.sqlcreate(query, args);
      if(r>0){
        return conn.getLastInsertedID();
      }
      return -1;
    }

    /**
     * Get messages for conversation list.
     *
     * @param conversationId the conversation id
     * @return the list of messages inside a conversation
     */
    public List<Map<String,Object>> getMessagesForConversation(int conversationId){
        String query = "CALL message_in_conversation(?);";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(conversationId));
        return conn.sqlGet(query, args);
    }

    /**
     * Get conversations list
     *
     * @return the list of conversations
     */
    public List<Map<String, Object>> getConversations(){
        String sql = "SELECT * FROM conversations";
        return conn.sqlGet(sql, new ArrayList<>());
    }

    /**
     * Get users in a conversation.
     *
     * @param conversationId the conversation id
     * @return list of users in the conversation
     */
    public List<Map<String, Object>> getUsersInConversation(int conversationId){
        String sql = "SELECT * FROM users as u JOIN users_converses_users as uu on u.id = uu.Users_id or u.id = Users_id1 JOIN conversations as c on c.id = uu.Conversations_id WHERE c.id =?  group by u.id;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(conversationId));
        return conn.sqlGet(sql, args);
    }


    /**
     * Get messages in a thread.
     *
     * @param threadID the thread id
     * @return list of messages in the thread
     */
    public List<Map<String, Object>> getMessagesInThread(int threadID){
        String sql = "select * from message where thread_id =?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(threadID));
        return conn.sqlGet(sql,  args);
  }

    /**
     * retrieves a list of conversations with the given id
     *
     * @param id the id of the conversation(s) being searched for
     * @return the list of conversations with that id
     */
    public List<Map<String, Object>> getConversationsById(int id){
        String sql = "SELECT * FROM conversations where id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlGet(sql, args);
    }

    /**
     * Get conversations list.
     *
     * @param userId the user id
     * @return the list
     */
    public List<Map<String, Object>> getConversations(int userId){
        String sql = "SELECT * FROM conversations as c JOIN users_converses_users as uu on c.id = uu.Conversations_id WHERE uu.users_id=? OR uu.users_id1=?;";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, Integer.toString(userId), Integer.toString(userId));
        ChatLogger.info(sql);
        return conn.sqlGet(sql, args);
    }

    /**
     * Get thread list.
     *
     * @param threadId the thread id
     * @return the list
     */
    public List<Map<String,Object>> getThread(int threadId){
        String sql = "SELECT * FROM thread WHERE id=?";
        ChatLogger.info(sql);
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(threadId));
        return conn.sqlGet(sql, args);
    }

    /**
     * Get last inserted conversation id
     *
     * @return last inserted conversation id
     */
    public int getLastInsertedID() {
        return conn.getLastInsertedID();
    }

}
