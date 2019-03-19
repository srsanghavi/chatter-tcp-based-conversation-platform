package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.util.List;
import java.util.Map;




public class ConversationDB{
    /**
     * The Mysql con.
     */
    static MysqlCon  mysqlCon;

    /**
     * Instantiates a new Conversation db.
     */
    public ConversationDB(){
        mysqlCon = MysqlCon.getInstance();
    }

    /**
     * Create conversation for user int.
     *
     * @param userid1 the userid 1
     * @param userid2 the userid 2
     * @return the int (1 if conversation is created, -1 otherwise)
     */
    public static int createConversationForUser(int userid1,int userid2){
        int conversationId = getUserUserConversation(userid1,userid2);
        if(conversationId<0){
            String createConvQuery = "SELECT user_user_conversation("+userid1+","+userid2+") as conversations_id";
            List<Map<String, Object>> r = mysqlCon.sqlGet(createConvQuery);
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
    private static int getUserUserConversation(int id1,int id2) {
        String query = "select conversations_id from users_converses_users where (users_id="+id1+" and users_id1="+id2+") or ( users_id="+id2+" and users_id1="+id1+")";

        List<Map<String, Object>> rs = mysqlCon.sqlGet(query);
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
    public static int createThreadForConversation(int conversationId){
        String query = "INSERT INTO thread(conversations_id) VALUES ("+conversationId+")";
        int r = mysqlCon.sqlcreate(query);
        if(r>0){
            return mysqlCon.getLastInsertedID();
        }
        return -1;
    }


    /**
     * Get threads for conversation list.
     *
     * @param conversationId the conversation id
     * @return the list of threads
     */
    public static List<Map<String,Object>> getThreadsForConversation(int conversationId){
        String query = "SELECT * FROM thread WHERE conversations_id=" + conversationId;
        return mysqlCon.sqlGet(query);
    }


    /**
     * Create message for thread int.
     *
     * @param threadId the thread id
     * @param senderId the sender id
     * @param text      the text
     * @return the int
     */
    public static int createMessageForThread(int threadId, int senderId, String text){
        String query = "INSERT INTO message(sender_id,thread_id,text) VALUES ("+senderId+","+threadId+",'"+text+"');";
        int r = mysqlCon.sqlcreate(query);
        if(r>0){
            return mysqlCon.getLastInsertedID();
        }
        return -1;
    }

    /**
     * Get messages for conversation list.
     *
     * @param conversationId the conversation id
     * @return the list of messages inside a conversation
     */
    public static List<Map<String,Object>> getMessagesForConversation(int conversationId){
        String query = "CALL message_in_conversation("+conversationId+");";
        return mysqlCon.sqlGet(query);
    }

    /**
     * Get conversations list
     *
     * @return the list of conversations
     */
    public static List<Map<String, Object>> getConversations(){
        String sql = "SELECT * FROM conversations";
        return mysqlCon.sqlGet(sql);
    }

    /**
     * retrieves a list of conversations with the given id
     *
     * @param id the id of the conversation(s) being searched for
     * @return the list of conversations with that id
     */
    public static List<Map<String, Object>> getConversationsById(int id){
        String sql = "SELECT * FROM conversations where id='"+id+"'";
        return mysqlCon.sqlGet(sql);
    }

    public static List<Map<String, Object>> getConversations(int userId){
        String sql = "SELECT * FROM conversations as c JOIN users_converses_users as uu on c.id = uu.Conversations_id WHERE uu.users_id=" +userId+" OR uu.users_id1="+userId;
        ChatLogger.info(sql);
        return mysqlCon.sqlGet(sql);
    }

}
