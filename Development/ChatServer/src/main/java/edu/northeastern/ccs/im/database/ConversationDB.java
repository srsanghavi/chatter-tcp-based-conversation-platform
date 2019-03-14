package edu.northeastern.ccs.im.database;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;




public class ConversationDB{
    /**
     * The Mysql con.
     */
    MysqlCon mysqlCon;

    /**
     * Instantiates a new Conversation db.
     */
    public ConversationDB(){
        mysqlCon = MysqlCon.getInstance();
    }

    private List<Map<String,Object>> getUserConversations(int userid){
        String query = "SELECT * FROM users_converses_users JOIN conversations" +
                         "ON users_converses_users.conversation_id=conversations.id WHERE user_id="+String.valueOf(userid)+"or user_id1="+String.valueOf(userid);
        try {
            return mysqlCon.sqlGet(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    /**
     * Create conversation for user int.
     *
     * @param userid1 the userid 1
     * @param userid2 the userid 2
     * @return the int (1 if conversation is created, -1 otherwise)
     */
    public int createConversationForUser(int userid1,int userid2){
        int conversation_id = getUserUserConversation(userid1,userid2);
        if(conversation_id<0){
            String createConvQuery = "SELECT user_user_conversation("+userid1+","+userid2+") as conversations_id";
            try {
                List<Map<String, Object>> r = mysqlCon.sqlGet(createConvQuery);
                if(!r.isEmpty()){
                    conversation_id = (int) r.get(0).get("conversations_id");
                }else {
                    conversation_id = -1;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return conversation_id;
    }

    /**
     *
     * @param id1
     * @param id2
     * @return int id of the conversation
     */
    private int getUserUserConversation(int id1,int id2) {
        String query = "select conversations_id from users_converses_users where (users_id="+id1+" and users_id1="+id2+") or ( users_id="+id2+" and users_id1="+id1+")";

        try {
            List<Map<String, Object>> rs = mysqlCon.sqlGet(query);
            if(!rs.isEmpty()){
                return (int) rs.get(0).get("Conversations_id");
            }else {
                return -1;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }


    /**
     * Create thread for conversation int.
     *
     * @param conversation_id the conversation id
     * @return the int (1 if thread is created, -1 o.w.)
     */
    public int createThreadForConversation(int conversation_id){
        String query = "INSERT INTO thread(conversations_id) VALUES ("+conversation_id+")";
        try {
            int r = mysqlCon.sqlcreate(query);
            if(r>0){
                int id = mysqlCon.getLastInsertedID();
                return id;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }


    /**
     * Get threads for conversation list.
     *
     * @param conversation_id the conversation id
     * @return the list of threads
     */
    public List<Map<String,Object>> getThreadsForConversation(int conversation_id){
        String query = "SELECT * FROM thread WHERE conversations_id=" + conversation_id;
        try {
            return mysqlCon.sqlGet(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }


    /**
     * Create message for thread int.
     *
     * @param thread_id the thread id
     * @param sender_id the sender id
     * @param text      the text
     * @return the int
     */
    public int createMessageForThread(int thread_id, int sender_id, String text){
        String query = "INSERT INTO message(sender_id,thread_id,text) VALUES ("+sender_id+","+thread_id+",'"+text+"');";
        try {
            int r = mysqlCon.sqlcreate(query);
            if(r>0){
                int id = mysqlCon.getLastInsertedID();
                return id;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    /**
     * Get messages for conversation list.
     *
     * @param conversation_id the conversation id
     * @return the list of messages inside a conversation
     */
    public List<Map<String,Object>> getMessagesForConversation(int conversation_id){
        String query = "CALL message_in_conversation("+conversation_id+");";
        try {
            return mysqlCon.sqlGet(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    /**
     * Get conversations list
     *
     * @return the list of conversations
     */
    public List<Map<String, Object>> getConversations(){
        String sql = "SELECT * FROM conversations";
        try {
            return mysqlCon.sqlGet(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * retrieves a list of conversations with the given id
     *
     * @param id the id of the conversation(s) being searched for
     * @return the list of conversations with that id
     */
    public List<Map<String, Object>> getConversationsById(String id){
        String sql = "SELECT * FROM conversations where id='"+id+"'";
        try {
            return mysqlCon.sqlGet(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    /**
     * retrieves a list threads in the conversation
     *
     * @param id the id of the conversation for which threads are being retrieved
     * @return the list of threads in the conversation
     */
    public List<Map<String, Object>> getThreads(String id){
        String sql = "SELECT * FROM thread where conversations_id='"+id+"'";
        try {
            return mysqlCon.sqlGet(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}
