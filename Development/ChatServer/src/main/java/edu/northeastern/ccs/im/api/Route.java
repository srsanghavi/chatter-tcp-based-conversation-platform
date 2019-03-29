package edu.northeastern.ccs.im.api;

/**
 * Routes: This class includes methods to be called when specific API endpoint is called
 *
 */

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.northeastern.ccs.im.Controller.ControllerFactory;
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
    public static String getResponseGet(String username, String route, String params){
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
                            .getGroupUsers(username,json);
                    break;

                case ApiMessageType.GET_THREAD_CONV:
                    response = ControllerFactory
                            .getConversationController()
                            .getThreadsInConversation(username,json);
                    break;

                case ApiMessageType.GET_MSG_CONV:
                    response = ControllerFactory
                            .getConversationController()
                            .getMessagesInConversation(username,json);
                    break;

                case ApiMessageType.GET_USER_BY_USERNAME:
                    response = ControllerFactory
                            .getUserController()
                            .getUserByUsername(json);
                    break;

                case ApiMessageType.GET_CONV_USER:
                    response = ControllerFactory
                            .getConversationController()
                            .getUsersInConversation(username,json);
                    break;

                case ApiMessageType.GET_MESSAGE_THREAD:
                    response = ControllerFactory
                            .getConversationController()
                            .getMessagesInThread(username,json);
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
    public static String getResponsePost(String username, String route,String data){
        Map<String, Object> json = decodeJSON(data);

        switch (route){
            case ApiMessageType.CREATE_USER:
                json = ControllerFactory
                        .getUserController()
                        .createUser(json);
                break;

            case ApiMessageType.CREATE_MESSAGE:
                json = ControllerFactory
                        .getConversationController()
                        .createMessage(json);
                break;

            case ApiMessageType.BROADCAST_MESSAGE:
                json = ControllerFactory
                        .getConversationController()
                        .broadCastMessage(json);
                break;


            case ApiMessageType.ADD_USER_GROUP:
                json = ControllerFactory
                        .getGroupController()
                        .addUserToGroup(username, json);
                break;

            case ApiMessageType.CREATE_THREAD_CONV:
                json = ControllerFactory
                        .getConversationController()
                        .createThread(json);
                break;

            case ApiMessageType.MODIFY_GROUP_NAME:
                json = ControllerFactory
                        .getGroupController()
                        .modifyGroupName(username, json);
                break;

            case ApiMessageType.DELETE_USER:
                json = ControllerFactory
                        .getUserController()
                        .deleteUser(json);
                break;

            case ApiMessageType.DELETE_GROUP:
                json = ControllerFactory
                        .getGroupController()
                        .deleteGroup(username,json);
                break;

            case ApiMessageType.DELETE_MESSAGE:
                json = ControllerFactory
                        .getConversationController()
                        .deleteMessage(json);
                break;


            case ApiMessageType.ADD_GROUP_GROUP:
                json = ControllerFactory
                        .getGroupController()
                        .addGroupToGroup(username,json);
                break;

          case ApiMessageType.CREATE_USER_USER_CONV:
                json = ControllerFactory
                        .getConversationController()
                        .createUserUserConversation(json);
                break;
          case ApiMessageType.CREATE_GROUP:
                json = ControllerFactory
                        .getGroupController()
                        .createGroup(json);
                break;

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
