package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.util.*;

/**
 * Database methods for UserModel
 */
public class UserModel {
    /**
     * The connection
     */
    private DataCon conn;

    /**
     * Instantiates a new UserModel db.
     */
    public UserModel(DataCon connection){
        conn = connection;
    }

    /**
     * Is authorized int.
     *
     * @param username the email
     * @param pass  the pass
     * @return the int (1 if authorized, 0 otherwise)
     */
    public int isAuthorized(String username,String pass){
        List<String> arguments = new ArrayList<>();
        arguments.add(username);
        arguments.add(pass);
        String sql = "SELECT user_auth(?, ?) as authorized;";
        List<Map<String, Object>> res = conn.sqlGet(sql, arguments);
        return (int) res.get(0).get("authorized");
    }

    /**
     * Create user int.
     *
     * @param username  the username
     * @param email     the email
     * @param password  the password
     * @param firstName the first name
     * @param lastName  the last name
     * @return the int (1 if created, 0 otherwise)
     */
    public int createUser(String username, String email, String password, String firstName, String lastName){
        String query = "INSERT INTO users(username,first_name,last_name, email, password) VALUES (?, ?, ?, ?, MD5(?));";

        List<String> arguments = new ArrayList<>(Arrays.asList(username, firstName, lastName, email, password));
        ChatLogger.info("Executing: " + query);
        return conn.sqlcreate(query, arguments);
    }

    public int createUser(String username, String password){

        String query = "INSERT INTO users(username, password) VALUES (?, MD5(?));";

        List<String> arguments = new ArrayList<>(Arrays.asList(username, password));
        ChatLogger.info("Executing: " + query);
        return conn.sqlcreate(query, arguments);
    }

    /**
     * @return Last created id of User
     */
    public int lastCreatedUser(){
        return conn.getLastInsertedID();
    }

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers(){
        String sql = "SELECT * FROM users";
        List<Map<String, Object>> r = conn.sqlGet(sql, new ArrayList<>());
        for(Map<String, Object> user: r){
            user.remove("password");
        }
        return r;
    }

    /**
     * Get users list.
     *
     * @param filterBy the filter by accepted value = email, first_name, last_name, username
     * @param value    the value
     * @return the list
     */
    public List<Map<String, Object>> getUsers(String filterBy,String value){
        if(!filterBy.equals("email") && !filterBy.equals("first_name") && !filterBy.equals("last_name")
                && !filterBy.equals("username")){
            ChatLogger.error("Illegal filter name passed. Available filter names : email, first_name, last_name");
            return Collections.emptyList();
        }
        String sql = "SELECT * FROM users where ?=?";
        return conn.sqlGet(sql, new ArrayList<>(Arrays.asList(filterBy, value)));
    }

    /**
     * Returns the user with the unique id
     * @param id the unique id of the user
     * @return the user
     */
    public Map<String, Object> getUser(int id){
        String sqlUsername = "SELECT * from users WHERE id = ?";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlGet(sqlUsername, args).get(0);
    }

    public int getUserID(String username){
      int id = 0;
      String sql = "SELECT * FROM users where username=?";
      List<String> arguments = new ArrayList<>();
      arguments.add(username);
      List<Map<String, Object>> jsonObj;
      jsonObj = conn.sqlGet(sql, arguments);
      id = (int)(jsonObj.get(0)).get("id");
      return id;
    }

    public List<Map<String, Object>> getUserByUserName(String username){
        String sql = "SELECT * FROM users where username=?;";
        List<String> args = new ArrayList<>();
        args.add(username);
        return conn.sqlGet(sql, args);
    }

    public List<Map<String,Object>> getGroups(int userId) {
        String sql = "SELECT *\n" +
                "FROM groups as g JOIN groups_has_users as gu on g.id = gu.Groups_id\n" +
                "where users_id=?";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(userId));
        return conn.sqlGet(sql, args);
    }

    public int deleteUser(int id){
        String sql = "UPDATE users SET deleted=true WHERE id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlcreate(sql, args);
    }

    /**
     * Make a user private.
     * @param userId id for user
     * @return success/failure value
     */
    public int updateUserToPrivate(int userId){
        String query = "UPDATE users SET isSearchable='0' where id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(userId));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

  /**
   * Function to retrieve all public users.
   * @return list of public users
   */
    public List<Map<String,Object>> getNonPrivateUsers(){
      String sql = "SELECT * from users WHERE isSearchable='1';";
      return conn.sqlGet(sql, new ArrayList<>());
    }

    // UpdateUserSearchable
    // ModifyUserFirstName
    // ModifyUserLastName


}
