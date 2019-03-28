package edu.northeastern.ccs.im.api;

/**
 * Routes: This class includes methods to be called when specific API endpoint is called
 *
 */

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.Controller.ControllerFactory;
import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.GroupModel;
import edu.northeastern.ccs.im.database.MessageDB;
import edu.northeastern.ccs.im.database.UserModel;
import edu.northeastern.ccs.im.server.Prattle;
import org.json.JSONObject;

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
        List<Map<String, Object>> response;
        Map<String, Object> json = decodeJSON(params);

        try {
            switch (route) {

                case ApiMessageType.GET_USERS:
                    response = ControllerFactory
                            .getUserController()
                            .getUsers();
                    break;

                case ApiMessageType.GET_USER_CONVERSATION:
                    response = ControllerFactory
                            .getConversationController()
                            .getUserConversations(json);
                    break;

                case ApiMessageType.GET_USER_GROUP:
                    response = ControllerFactory
                            .getGroupController()
                            .getGroupsForUser(json);
                    break;

                case ApiMessageType.GET_GROUPS:
                    response = ControllerFactory
                            .getGroupController()
                            .getAllGroups();
                    break;

                case ApiMessageType.GET_GROUP_USERS:
                    response = ControllerFactory
                            .getGroupController()
                            .getGroupUsers(json);
                    break;

                case ApiMessageType.GET_THREAD_CONV:
                    response = ControllerFactory
                            .getConversationController()
                            .getThreadsInConversation(json);
                    break;

                case ApiMessageType.GET_MSG_CONV:
                    response = ControllerFactory
                            .getConversationController()
                            .getMessagesInConversation(json);
                    break;

                case ApiMessageType.GET_USER_BY_USERNAME:
                    response = ControllerFactory
                            .getUserController()
                            .getUserByUsername(json);
                    break;

                case ApiMessageType.GET_CONV_USER:
                    response = ControllerFactory
                            .getConversationController()
                            .getUsersInConversation(json);
                    break;

                case ApiMessageType.GET_MESSAGE_THREAD:
                    response = ControllerFactory
                            .getConversationController()
                            .getMessagesInThread(json);
                    break;


                default:
                    return "{result: error, resultCode: 404, resultMessage = 'invalid endpoint'}";
            }
        }catch (NoSuchFieldException e){
            return "{result: error, resultCode: 500, resultMessage = 'Missing Field'}";
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

        GroupModel groupDB = new GroupModel();
        String response = null;
        UserModel userModel = new UserModel();
        MessageDB messageDB = new MessageDB();

        ConversationModel conversationModel = new ConversationModel();
        Map<String, Object> json = decodeJSON(data);

        switch (route){
            case ApiMessageType.CREATE_USER:
            {
                String firstName = (String) json.get("first_name");
                String lastName = (String) json.get("last_name");

                String username = (String) json.get("username");
                String email = (String) json.get("email");
                String password = (String) json.get("password");

                int r = userModel.createUser(username, email, password, firstName, lastName);
                if(r>0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }else {
                    json.put("result_code",500);
                    json.put("result","error");
                }
                break;
            }
            case ApiMessageType.CREATE_MESSAGE:
                ChatLogger.info("sending message");
                String senderId = (String) json.get("sender_id");
                String senderName = (String) json.get("sender_name");
                String conversationId = (String) json.get("conversation_id");
                String threadId = (String) json.get("thread_id");
                String destinatonId = (String) json.get("destinationId");
                String destinationName = (String) json.get("destination_name");
                String message = (String) json.get("message");
                data = new JSONObject(data).toString();
                if(ConversationModel.createMessageForThread(Integer.valueOf(threadId),Integer.valueOf(senderId),message)>0){
                    Message msg = Message.makeNotificationMessage(senderName,data);
                    Prattle.sendMessageToUser(destinationName,msg);
                    json.put("result_code",201);
                    json.put("result","OK");
                }else {
                    return  "{result: error, resultCode: 500, resultMessage: 'could not create message'}";
                }
                break;

//          case "broadcastMessage/":
//                String text = (String) json.get("message");
//                String sender = (String) json.get("sender_id");
//                List<Map<String, Object>> conversations = ConversationModel.getConversations(Integer.parseInt(sender));
//



            case "broadcastMessage/":
                String text = (String) json.get("message");
                int sender = Math.toIntExact(Math.round((double) json.get("sender_id")));
                List<Map<String, Object>> conversations = ConversationModel.getConversations(sender);
                System.out.println(conversations);
                int conversation_id = -1;
                int thread_id = -1;
                int message_id = -1;
                for (Map<String, Object> conversation : conversations){
                    conversation_id = (Integer) conversation.get("id");
                    thread_id = conversationModel.createThreadForConversation(conversation_id);
                    message_id = conversationModel.createMessageForThread(thread_id, sender, text);
                    conversationModel.addMessageToThread(message_id, thread_id);
                }
                break;


          case ApiMessageType.ADD_USER_GROUP:
            String userId = (String) json.get("user_id");
            String groupId = (String) json.get("group_id");
            if(groupDB.addUserToGroup(Integer.valueOf(groupId),Integer.valueOf(userId),0)>0){
              json.put("result_code",201);
              json.put("result","OK");
              response = json.toString();
            }else {
              response = "{result: error, resultCode: 500, resultMessage: 'could not add userModel to group'}";
            }
            break;

          case ApiMessageType.CREATE_THREAD_CONV:
            threadId = (String) json.get("thread_id");
            groupId = (String) json.get("group_id");
            if(ConversationModel.createThreadForConversationByThreadID(Integer.valueOf(threadId),Integer.valueOf(groupId))>0){
              json.put("result_code",201);
              json.put("result","OK");
              response = json.toString();
            }else {
              response = "{result: error, resultCode: 500, resultMessage: 'could not add thread to group'}";
            }
            break;

          case ApiMessageType.ADD_MESSAGE_THREAD:
            threadId = (String) json.get("thread_id");
            String messageId = (String) json.get("message_id");
            if(ConversationModel.addMessageToThread(Integer.valueOf(messageId),Integer.valueOf(threadId))>0){
              json.put("result_code",201);
              json.put("result","OK");
              response = json.toString();
            }else {
              response = "{result: error, resultCode: 500, resultMessage: 'could not add message to thread'}";
            }
            break;
            case ApiMessageType.MODIFY_GROUP_NAME:
                groupId = (String) json.get("group_id");
                String name = (String) json.get("group_name");
                if(groupDB.updateGroupName(Integer.valueOf(groupId), name) > 0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }
                else
                    response = "{result: error, resultCode: 500, resultMessage: 'Could not update group name'}";
                break;
            case ApiMessageType.DELETE_USER:
                userId = (String) json.get("user_id");
                if(userModel.deleteUser(Integer.valueOf(userId)) > 0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }
                else
                    response = "{result: error, resultCode: 500, resultMessage: 'could not delete userModel'}";
                break;
            case ApiMessageType.DELETE_GROUP:
                userId = (String) json.get("group_id");
                if(groupDB.deleteGroup(Integer.valueOf(userId)) > 0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }
                else
                    response = "{result: error, resultCode: 500, resultMessage: 'could not delete group'}";
                break;

            case ApiMessageType.DELETE_MESSAGE:
                messageId = (String) json.get("message_id");
                if(messageDB.deleteMessage(Integer.valueOf(messageId)) > 0){
                    json.put("result_code",201);
                    json.put("result","OK");
                    response = json.toString();
                }
                else
                    response = "{result: error, resultCode: 500, resultMessage: 'could not delete message'}";
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
        try {
            return new Gson().fromJson(
                    jsonString, new TypeToken<HashMap<String, Object>>() {}.getType()
            );
        }catch (Exception e){
            System.out.println(e);
            return null;
        }

    }
}
