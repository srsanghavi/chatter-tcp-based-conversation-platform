package edu.northeastern.ccs.im.Controller;

import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.database.UserModel;

import java.util.List;
import java.util.Map;

/**
 * The type User controller.
 */
public class UserController {

    private static String USERNAME = "username";
    private static String RESULT_CODE = "result_code";
    private static String RESULT = "result";

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
        if(!json.containsKey(USERNAME)){
            throw new NoSuchFieldException();
        }
        String username = (String) json.getOrDefault(USERNAME,"");
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
            !json.containsKey(USERNAME) ||
            !json.containsKey("email") ||
            !json.containsKey("password")){
            json.put(RESULT_CODE,400);
            json.put(RESULT,"error");
            json.put("error_message","Missing parameter");
            return json;
        }
        String firstName = (String) json.get("first_name");
        String lastName = (String) json.get("last_name");

        String username = (String) json.get(USERNAME);
        String email = (String) json.get("email");
        String password = (String) json.get("password");

        int r = userModel.createUser(username, email, password, firstName, lastName);
        if(r>0){
            json.put(RESULT_CODE,201);
            json.put(RESULT,"OK");
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
            json.put(RESULT_CODE,201);
            json.put(RESULT,"OK");
            return json;
        }
        else return error500(json);
    }

    private Map<String, Object> error500(Map<String,Object> json){
        json.put(RESULT_CODE,500);
        json.put(RESULT,"error");
        json.put("result_message","Could not create a message");
        return json;
    }
}
