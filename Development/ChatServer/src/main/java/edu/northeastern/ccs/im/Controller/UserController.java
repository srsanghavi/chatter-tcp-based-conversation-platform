package edu.northeastern.ccs.im.Controller;

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
    private UserModel userModel = ModelFactory.getUserModel();

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
        return userModel.getUserByUserName(username);
    }

    /**
     * Create user json object.
     *
     * @param json the json
     * @return the json object
     */
    public Map<String, Object> createUser(Map<String,Object> json){
        if(!json.containsKey("first_name") ||
            !json.containsKey("last_name") ||
            !json.containsKey("username") ||
            !json.containsKey("email") ||
            !json.containsKey("password")){
            json.put("result_code",400);
            json.put("result","error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String firstName = (String) json.get("first_name");
        String lastName = (String) json.get("last_name");

        String username = (String) json.get("username");
        String email = (String) json.get("email");
        String password = (String) json.get("password");

        int r = userModel.createUser(username, email, password, firstName, lastName);
        if(r>0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }else {
            return error500(json);
        }
    }


    /**
     * Delete user map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String,Object> deleteUser(Map<String,Object> json){
        int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
        if(userModel.deleteUser(userId) > 0){
            json.put("result_code",201);
            json.put("result","OK");
            return json;
        }
        else return error500(json);
    }

    private Map<String, Object> error500(Map<String,Object> json){
        json.put("result_code",500);
        json.put("result","error");
        json.put("result_message","Could not create a message");
        return json;
    }
}
