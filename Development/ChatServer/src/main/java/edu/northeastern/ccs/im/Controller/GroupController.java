package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.database.GroupModel;
import edu.northeastern.ccs.im.database.ModelFactory;

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
    public List<Map<String, Object>> getGroupUsers(Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey("group_id")){
            throw new NoSuchFieldException();
        }
        int groupId = Math.toIntExact(Math.round((double) json.getOrDefault("group_id", 0)));
        return groupModel.getUsers(Integer.valueOf(groupId));
    }
}
