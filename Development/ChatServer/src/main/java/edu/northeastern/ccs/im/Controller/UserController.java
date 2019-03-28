package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.database.ConversationModel;
import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.database.UserModel;

import java.util.List;
import java.util.Map;

/**
 * The type User controller.
 */
public class UserController {
    /**
     * The User model.
     */
    UserModel userModel = ModelFactory.getUserModel();

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers(){
        return this.userModel.getUsers();
    }

    /**
     * Gets user by username.
     *
     * @param json the json
     * @return the user by username
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getUserByUsername(Map<String,Object> json) throws NoSuchFieldException {
        if(!json.containsKey("username")){
            throw new NoSuchFieldException();
        }
        String username = (String) json.getOrDefault("username",0);
        return UserModel.getUserByUserName(username);
    }



}
