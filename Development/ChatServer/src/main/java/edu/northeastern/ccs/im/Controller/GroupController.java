package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.database.GroupModel;
import edu.northeastern.ccs.im.database.ModelFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Group controller.
 */
public class GroupController {
    /**
     * The Group model.
     */
    GroupModel groupModel = ModelFactory.getGroupModel();

    private static String RESULT_CODE = "result_code";
    private static String CONVERSATIONS_ID = "conversations_id";
    private static String RESULT = "result";
    private static String ERROR = "error";
    private static String ERROR_MESSAGE = "error_message";
    private static String MISSING_PARAMETER = "Missing parameter";
    private static String USER_ID = "user_id";
    private static String GROUP_ID = "group_id";
    private static String RESULT_MESSAGE = "result_message";
    private static String GROUP_NAME = "group_name";

    /**
     * Get all groups list.
     *
     * @return the list
     */
    public List<Map<String,Object>> getAllGroups(){
        return groupModel.getAllGroups();
    }

    /**
     * Gets groups for user.
     *
     * @param json the json
     * @return the groups for user
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getGroupsForUser(Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey(USER_ID)){
            ChatLogger.info("No user id");
            throw new NoSuchFieldException();
        }
        int id = Math.toIntExact(Math.round((double) json.getOrDefault(USER_ID, 0)));
        return ModelFactory.getUserModel().getGroups(id);
    }

    /**
     * Gets group users.
     *
     * @param json the json
     * @return the group users
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getGroupUsers(String username, Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey(GROUP_ID)){
            throw new NoSuchFieldException();
        }
        int groupId = Math.toIntExact(Math.round((double) json.getOrDefault(GROUP_ID, 0)));

        int userId = ModelFactory.getUserModel().getUserID(username);


        List<Map<String, Object>> groupUsers = groupModel.getUsers(groupId);

        for(Map<String,Object> user:groupUsers){
            if((int)user.get(USER_ID)==userId){
                return groupUsers;
            }
        }

        return error401();
    }

    /**
     * Add user to group map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> addUserToGroup(String username,Map<String,Object> json){
        if(!json.containsKey("user_id") ||
                !json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        int adminId = ModelFactory.getUserModel().getUserID(username);
        int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
        int groupId = Math.toIntExact(Math.round((double) json.get("group_id")));

        if(!isGroupAdmin(groupId,adminId)){
            return error401Post();
        }

        if(groupModel.addUserToGroup(groupId, userId,0)>0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }else {
           return error500(json);
        }
    }

    /**
     * Modify group name map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> modifyGroupName(String username, Map<String,Object> json){
        if(!json.containsKey(GROUP_NAME) ||
                !json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        int userId = ModelFactory.getUserModel().getUserID(username);
        int groupId = Math.toIntExact(Math.round((double) json.get("group_id")));
        if(!isGroupAdmin(groupId,userId)){
            return error401Post();
        }
        String name = (String) json.get("group_name");
        if(groupModel.updateGroupName(groupId, name) > 0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }
        else return error500(json);

    }

    /**
     * Delete group map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> deleteGroup(String username,Map<String,Object> json){
        if(!json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        int userId = ModelFactory.getUserModel().getUserID(username);
        int groupId = Math.toIntExact(Math.round((double) json.get("group_id")));
        if(!isGroupAdmin(groupId,userId)){
            return error401Post();
        }
        if(groupModel.deleteGroup(groupId) > 0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }
        else return error500(json);
    }

  /**
   * Create group.
   * @param json the json
   * @return the json map
   */
    public Map<String,Object> createGroup(Map<String,Object> json){
      if(!json.containsKey("group_name")||
          !json.containsKey("admin_id")){
        json.put("result_code",400);
        json.put("result","error");
        json.put("error_message","Missing parameter");
        return json;
      }
      String groupName = (String) json.get("group_name");
      int adminId = Math.toIntExact(Math.round((double) json.get("admin_id")));
      if(groupModel.createGroup(groupName,adminId) > 0){
        json.put("result_code",201);
        json.put("result","OK");
        return json;
      }
      else return error500(json);
    }
    /**
     * Add group to group map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> addGroupToGroup(String username, Map<String,Object> json){
        if(!json.containsKey("group_id1") ||
        !json.containsKey("group_id2")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        int userId = ModelFactory.getUserModel().getUserID(username);


        int groupId1 = Math.toIntExact(Math.round((double) json.get("group_id1")));
        int groupId2 = Math.toIntExact(Math.round((double) json.get("group_id2")));

        if(!isGroupAdmin(groupId1,userId)){
            return error401Post();
        }

        if(groupModel.addGroupToGroup(groupId1, groupId2) > 0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }
        else
            return error500(json);
    }

    private Map<String, Object> error500(Map<String,Object> json){
        json.put("result_code",500);
        json.put("result","error");
        json.put(RESULT_MESSAGE,"Could not create a message");
        return json;
    }

    private List<Map<String, Object>> error401(){
        Map<String,Object> json = new HashMap<>();
        json.put("result_code",401);
        json.put("result","error");
        json.put(RESULT_MESSAGE,"User not authorized");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }

    private Map<String, Object> error401Post(){
        Map<String,Object> json = new HashMap<>();
        json.put("result_code",401);
        json.put("result","error");
        json.put(RESULT_MESSAGE,"User not authorized");

        return json;
    }

    private boolean isGroupAdmin(int groupId, int userId){
        List<Map<String, Object>> users = groupModel.getUsersInGroups(groupId);
        for(Map<String,Object> user:users){
            if(user.containsKey("Users_id") &&
                    (int)user.get("Users_id")==userId &&
                    ((int)user.get("is_admin")==1)){
                return true;
            }
        }
        return false;
    }
}
