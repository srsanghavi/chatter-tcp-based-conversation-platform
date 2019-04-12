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
    private static String RESULT_MESSAGE = "result_message";
    private static String PROFILE_PICTURE = "profile_picture";

    /**
     * The User model.
     */
    private UserModel userModel = ModelFactory.getUserModel();

    /**
     * Initialize usermodel
     * @param um UserModel
     */
    public UserController(UserModel um){
        userModel = um;
    }

    public UserController(){
    }

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers() {
        return this.userModel.getUsers();
    }

    /**
     * Gets user by username.
     *
     * @param json the json
     * @return the user by username
     * @throws NoSuchFieldException the no such field exception
     */
    public List<Map<String, Object>> getUserByUsername(Map<String, Object> json) throws NoSuchFieldException {
        if (!json.containsKey(USERNAME)) {
            throw new NoSuchFieldException();
        }
        String username = (String) json.getOrDefault(USERNAME, "");
        return userModel.getUserByUserName(username);
    }

    /**
     * Create user json object.
     *
     * @param json the json
     * @return the json object
     */
    public Map<String, Object> createUser(Map<String, Object> json) {
        if (!json.containsKey("first_name") ||
                !json.containsKey("last_name") ||
                !json.containsKey(USERNAME) ||
                !json.containsKey("email") ||
                !json.containsKey("password")) {
            json.put(RESULT_CODE, 400);
            json.put(RESULT, "error");
            json.put("error_message", "Missing parameter");
            return json;
        }
        String firstName = (String) json.get("first_name");
        String lastName = (String) json.get("last_name");

        String username = (String) json.get(USERNAME);
        String email = (String) json.get("email");
        String password = (String) json.get("password");

        int r = userModel.createUser(username, email, password, firstName, lastName);
        if (r > 0) {
            json.put(RESULT_CODE, 201);
            json.put(RESULT, "OK");
            return json;
        } else {
            return error500(json);
        }
    }


    /**
     * Delete user map.
     *
     * @param json the json
     * @return the map
     */
    public Map<String, Object> deleteUser(Map<String, Object> json) {
        int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
        if (userModel.deleteUser(userId) > 0) {
            json.put(RESULT_CODE, 201);
            json.put(RESULT, "OK");
            return json;
        } else return error500(json);
    }

    private Map<String, Object> error500(Map<String, Object> json) {
        json.put(RESULT_CODE, 500);
        json.put(RESULT, "error");
        json.put(RESULT_MESSAGE, "Could not create a message");
        return json;
    }

    public Map<String,Object> modifyUser(Map<String,Object> json){
        int userId = Math.toIntExact(Math.round((double) json.get("user_id")));
        String name = "";
        String pp = "";
         boolean isSearchable;
        if(json.containsKey("first_name")){
            name = (String) json.get("first_name");
            if(userModel.modifyUserFirstName(userId,name) < 0){
                json.put(RESULT_CODE,500);
                json.put(RESULT,"error");
                json.put(RESULT_MESSAGE,"Could not modify user details");
                return json;
            }
        }
        if(json.containsKey("last_name")){
            name = (String) json.get("last_name");
            if(userModel.modifyUserLastName(userId,name) < 0){
                json.put(RESULT_CODE,500);
                json.put(RESULT,"error");
                json.put("result_message","Could not modify user details");
                return json;
            }
        }
        if(json.containsKey("isSearchable")){
            isSearchable = ((boolean) json.get("isSearchable"));
            if(userModel.updateUserSearchable(userId,isSearchable?1:0) < 0){
                json.put(RESULT_CODE,500);
                json.put(RESULT,"error");
                json.put(RESULT_MESSAGE,"Could not modify user details");
                return json;
            }
        }
        if(json.containsKey("preferredLanguage")){
            String language = (String) json.get("preferredLanguage");
            if(userModel.modifyPreferredLanguage(userId,language) < 0){
                json.put(RESULT_CODE,500);
                json.put(RESULT,"error");
                json.put("result_message","Could not modify user details");
                return json;
            }
        }
        if(json.containsKey("profile_picture")){
            pp = (String) json.get("profile_picture");
            String url = userModel.updateProfilePicture(userId, pp);
            if(url.equals("")){
                json.put(RESULT_CODE,500);
                json.put(RESULT,"error");
                json.put(RESULT_MESSAGE,"Could not modify user details");
                return json;
            }
            json.put(PROFILE_PICTURE, url);
        }
        if (json.containsKey("profilePicture")) {
            pp = (String) json.get("profilePicture");
            String url = userModel.updateProfilePicture(userId, pp);
            if (url.equals("")) {
                json.put(RESULT_CODE, 500);
                json.put(RESULT, "error");
                json.put(RESULT_MESSAGE, "Could not modify user details");
                return json;
            }
            json.put(PROFILE_PICTURE, url);
        }
        json = userModel.getUser(userId);
        json.put(RESULT_CODE, 201);
        json.put(RESULT, "OK");
        return json;
    }

  /**
   * Get list of online users.
   * @return list of online users
   */
    public List<Map<String,Object>> getOnlineUsers(){
      return userModel.getOnlineUsers();
    }


}
