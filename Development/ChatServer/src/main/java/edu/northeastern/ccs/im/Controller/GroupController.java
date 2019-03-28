package edu.northeastern.ccs.im.Controller;

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
        if(!json.containsKey("user_id")){
            throw new NoSuchFieldException();
        }
        int id = Math.toIntExact(Math.round((double) json.getOrDefault("user_id", 0)));
        return ModelFactory.getUserModel().getGroups(Integer.valueOf(id));
    }

    /**
     * Gets group users.
     *
     * @param json the json
     * @return the group users
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getGroupUsers(String username, Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey("group_id")){
            throw new NoSuchFieldException();
        }
        int groupId = Math.toIntExact(Math.round((double) json.getOrDefault("group_id", 0)));

        int userId = ModelFactory.getUserModel().getUserID(username);


        List<Map<String, Object>> groupUsers = groupModel.getUsers(Integer.valueOf(groupId));

        for(Map<String,Object> user:groupUsers){
            if((int)user.get("user_id")==userId){
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
    public Map<String,Object> addUserToGroup(Map<String,Object> json){
        if(!json.containsKey("user_id") ||
                !json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String userId = (String) json.get("user_id");
        String groupId = (String) json.get("group_id");
        if(groupModel.addUserToGroup(Integer.valueOf(groupId),Integer.valueOf(userId),0)>0){
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
    public Map<String,Object> modifyGroupName(Map<String,Object> json){
        if(!json.containsKey("group_name") ||
                !json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String groupId = (String) json.get("group_id");
        String name = (String) json.get("group_name");
        if(groupModel.updateGroupName(Integer.valueOf(groupId), name) > 0){
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
    public Map<String,Object> deleteGroup(Map<String,Object> json){
        if(!json.containsKey("group_id")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }

        String userId = (String) json.get("group_id");
        if(groupModel.deleteGroup(Integer.valueOf(userId)) > 0){
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
    public Map<String,Object> addGroupToGroup(Map<String,Object> json){
        if(!json.containsKey("group_id1") ||
        !json.containsKey("group_id2")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String group_id1 = (String) json.get("group_id1");
        String group_id2 = (String) json.get("group_id2");
        if(groupModel.addGroupToGroup(Integer.valueOf(group_id1),Integer.valueOf(group_id2)) > 0){
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
        json.put("result_message","Could not create a message");
        return json;
    }

    private List<Map<String, Object>> error401(){
        Map<String,Object> json = new HashMap<>();
        json.put("result_code",401);
        json.put("result","error");
        json.put("result_message","User not authorized");

        List<Map<String,Object>> jsonList = new ArrayList<>();
        jsonList.add(json);
        return jsonList;
    }
}
