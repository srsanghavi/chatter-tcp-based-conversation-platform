package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

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

    public int createConversationForUser(int userid1,int userid2){
        int conversation_id = getUserUserConversation(userid1,userid2);
        if(conversation_id<0){
            String createConvQuery = "SELECT user_user_conversation("+userid1+","+userid2+") as conversations_id";
            try {
                List<Map<String, Object>> r = mysqlCon.sqlGet(createConvQuery);
                if(!r.isEmpty()){
                    ChatLogger.info(r.toString());
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


}
