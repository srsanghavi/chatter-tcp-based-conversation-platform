package edu.northeastern.ccs.im.api;

/**
 * Routes: This class includes methods to be called when specific API endpoint is called
 *
 */

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.conversation.Conversation;
import edu.northeastern.ccs.im.database.ConversationDB;
import edu.northeastern.ccs.im.database.GroupDB;
import edu.northeastern.ccs.im.database.MysqlCon;
import edu.northeastern.ccs.im.database.UserDB;
import edu.northeastern.ccs.im.server.Prattle;
import edu.northeastern.ccs.im.user.User;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Route {

    /**
     * Get GET API response string.
     *
     * @param route  the route
     * @param params the params JSON string with all elements as strings
     * @return the string
     */
    public static String getResponseGet(String route, String params){
        List<Map<String, Object>> response=new ArrayList<>();
        Map<String, Object> json = decodeJSON(params);
        UserDB userDB = new UserDB();
        ConversationDB conversationDB = new ConversationDB();
        ChatLogger.info(route);
        ChatLogger.info(params);
        ChatLogger.info(json.toString());
        switch (route){
            // get all users
            case "getUsers/":
                ChatLogger.info("getUsers:");
                response = userDB.getUsers();
                break;

            // get all conversations associated with the user which is supplied in the JSON as user_id
            // requires params: {user_id: "<user_id>"}
            case "getConversations/":
                ChatLogger.info("getConversations:");
                int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
                response = conversationDB.getConversations(userId);
                break;

            // get all conversations associated with the user which is supplied in the JSON as user_id
            // requires params: {user_id: "<user_id>"}
            case "getGroups/":
                ChatLogger.info("getGroups:");
                String id = (String) json.getOrDefault("user_id",0);
                response = userDB.getGroups(Integer.valueOf(id));
                break;

            case "getGroupUsers/":
                ChatLogger.info("getGroupUsers:");
                String group_id = (String) json.getOrDefault("group_id",0);
                response = GroupDB.getUsers(Integer.valueOf(group_id));
                break;

            case "getThreadsInConversation/":
                ChatLogger.info("getThreadsInConversation:");
                String conversation_id = (String) json.getOrDefault("conversation_id",0);
                response = ConversationDB.getThreadsForConversation(Integer.valueOf(conversation_id));
                break;
            case "getUserByUsername/":
                ChatLogger.info("getUserByUsername:");
                String username = (String) json.getOrDefault("username",0);
                response = UserDB.getUserByUserName(username);
                break;
            case "getUsersInConversation/":
                ChatLogger.info("getUsersInConversation:");
                conversation_id = (String) json.getOrDefault("conversation_id",0);
                response = ConversationDB.getUsersInConversation(Integer.valueOf(conversation_id));
                break;
          case "messageInThread/":
            ChatLogger.info("messageInThread:");
            String thread_id = (String) json.getOrDefault("thread_id",0);
            response = ConversationDB.getUsersInConversation(Integer.valueOf(thread_id));
            break;


            default:
                return "{result: error, resultCode: 404, resultMessage = 'invalid endpoint'}";
        }

        Map<String,Object> result = new HashMap<>();
        result.put("result",response);
        return new JSONObject(result).toString();
    }

    /**
     * Get POST response  string.
     *
     * @param route the route
     * @param data  the data JSON
     * @return the string with POST response
     */
    public static String getResponsePost(String route,String data){
        String response = null;
        UserDB userDB = new UserDB();
        Map<String, Object> json = decodeJSON(data);
        switch (route){
            case "registerUser/":
            {
                String firstName = (String) json.get("first_name");
                String lastName = (String) json.get("last_name");

                String username = (String) json.get("username");
                String email = (String) json.get("email");
                String password = (String) json.get("password");

                int r = userDB.createUser(username, email, password, firstName, lastName);
                if(r>0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }else {
                    json.put("result_code",500);
                    json.put("result","error");
//                    response = json.toString();
                }
                break;
            }
            case "sendMessage/":
                String senderId = (String) json.get("sende_idr");
                String senderName = (String) json.get("sender_name");
                String conversationId = (String) json.get("conversation_id");
                String threadId = (String) json.get("thread_id");
                String destinatonId = (String) json.get("destinationId");
                String destinationName = (String) json.get("destination_name");
                String message = (String) json.get("message");
                if(ConversationDB.createMessageForThread(Integer.valueOf(threadId),Integer.valueOf(senderId),message)>0){
                    Message msg = Message.makeBroadcastMessage(senderName,data);
                    Prattle.sendMessageToUser(destinationName,msg);
                    json.put("result_code",201);
                    json.put("result","OK");
//                    response = json.toString();
                }else {
                    return  "{result: error, resultCode: 500, resultMessage: 'could not create message'}";
                }
                break;

//                TODO: following

//            case "createGroup/":
//            case "addToGroup/":
            default:
                return  "{result: error, resultCode: 404, resultMessage = 'invalid endpoint'}";
        }
        return new JSONObject(json).toString();
    }

    private static Map<String,Object> decodeJSON(String jsonString){
        return new Gson().fromJson(
                jsonString, new TypeToken<HashMap<String, Object>>() {}.getType()
        );
    }
}
