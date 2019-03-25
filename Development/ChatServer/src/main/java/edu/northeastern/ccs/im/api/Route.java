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
import edu.northeastern.ccs.im.database.UserDB;
import edu.northeastern.ccs.im.server.Prattle;

import java.util.HashMap;
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
        String response=null;
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
                response = userDB.getUsers().toString();
                break;

            // get all conversations associated with the user which is supplied in the JSON as user_id
            // requires params: {user_id: "<user_id>"}
            case "getConversations/":
                ChatLogger.info("getConversations:");
                int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
                response = conversationDB.getConversations(userId).toString();
                break;

            // get all conversations associated with the user which is supplied in the JSON as user_id
            // requires params: {user_id: "<user_id>"}
            case "getGroups/":
                ChatLogger.info("getGroups:");
                String id = (String) json.getOrDefault("user_id",0);
                response = userDB.getGroups(Integer.valueOf(id)).toString();
                break;

            case "getGroupUsers/":
                ChatLogger.info("getGroupUsers:");
                String group_id = (String) json.getOrDefault("group_id",0);
                response = GroupDB.getUsers(Integer.valueOf(group_id)).toString();
                break;

            case "getThreadsInConversation/":
                ChatLogger.info("getThreadsInConversation:");
                String conversation_id = (String) json.getOrDefault("conversation_id",0);
                response = ConversationDB.getThreadsForConversation(Integer.valueOf(conversation_id)).toString();
                break;
            case "getUserByUsername/":
                ChatLogger.info("getUserByUsername:");
                String username = (String) json.getOrDefault("username",0);
                response = UserDB.getUserByUserName(username).toString();
                break;
            case "getUsersInConversation/":
                ChatLogger.info("getUsersInConversation:");
                conversation_id = (String) json.getOrDefault("conversation_id",0);
                response = ConversationDB.getUsersInConversation(Integer.valueOf(conversation_id)).toString();
                break;
          case "messageInThread/":
            ChatLogger.info("messageInThread:");
            String thread_id = (String) json.getOrDefault("thread_id",0);
            response = ConversationDB.getUsersInConversation(Integer.valueOf(thread_id)).toString();
            break;


            default:
                response = "{result: error, resultCode: 404, resultMessage = 'invalid endpoint'}";
        }
        return response;
    }

    /**
     * Get POST response  string.
     *
     * @param route the route
     * @param data  the data JSON
     * @return the string with POST response
     */
    public static String getResponsePost(String route,String data){
        GroupDB groupDB = new GroupDB();
        String response = null;
        Map<String, Object> json = decodeJSON(data);
        switch (route){
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
                    response = json.toString();
                }else {
                    response = "{result: error, resultCode: 500, resultMessage: 'could not create message'}";
                }
                break;

          case "addUserToGroup/":
            String userId = (String) json.get("user_id");
            String groupId = (String) json.get("group_id");
            if(groupDB.addUserToGroup(Integer.valueOf(groupId),Integer.valueOf(userId),0)>0){
              json.put("result_code",201);
              json.put("result","OK");
              response = json.toString();
            }else {
              response = "{result: error, resultCode: 500, resultMessage: 'could not add user to group'}";
            }
            break;

//                TODO: following

//            case "createGroup/":
//            case "addToGroup/":
            default:
                response = "{result: error, resultCode: 404, resultMessage = 'invalid endpoint'}";
        }
        return response;
    }

    private static Map<String,Object> decodeJSON(String jsonString){
        return new Gson().fromJson(
                jsonString, new TypeToken<HashMap<String, Object>>() {}.getType()
        );
    }
}
