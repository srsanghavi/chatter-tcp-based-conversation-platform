package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.util.Collections;
import java.util.List;
import java.util.Map;

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
     *
     * @param connection the connection
     */
    public UserModel(DataCon connection){
        conn = connection;
    }

    /**
     * Is authorized int.
     *
     * @param username the email
     * @param pass     the pass
     * @return the int (1 if authorized, 0 otherwise)
     */
    public int isAuthorized(String username,String pass){
        String sql = "SELECT user_auth('"+username+"','"+pass+"') as authorized;";
        List<Map<String, Object>> res = conn.sqlGet(sql);
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

        final String sep = "\" , \"";

        String query = "INSERT INTO users(username,first_name,last_name, email, password) VALUES (\"" +
                username +
                sep +
                firstName +
                sep +
                lastName +
                sep +
                email +
                "\" , " +
                "MD5('" + password + "')" +
                ");";
        ChatLogger.info("Executing: " + query);
        return conn.sqlcreate(query);
    }

    /**
     * Create user int.
     *
     * @param username the username
     * @param password the password
     * @return the int
     */
    public int createUser(String username, String password){

        final String sep = "\" , \"";

        String query = "INSERT INTO users(username, password) VALUES (\"" +
                username +
                sep +
                "\" , " +
                "MD5('" + password + "')" +
                ");";
        ChatLogger.info("Executing: " + query);
        ChatLogger.info(Integer.toString(this.conn.sqlcreate(query)));
        return 0;
    }

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers(){
        String sql = "SELECT * FROM users";
        List<Map<String, Object>> r = conn.sqlGet(sql);
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
        String sql = "SELECT * FROM users where "+filterBy+"='"+value+"'";
        return conn.sqlGet(sql);
    }

    /**
     * Returns the user with the unique id
     *
     * @param id the unique id of the user
     * @return the user
     */
    public Map<String, Object> getUser(int id){
        String sqlUsername = "SELECT * from users WHERE id = " + id;

        return conn.sqlGet(sqlUsername).get(0);
    }

    /**
     * Get user id int.
     *
     * @param username the username
     * @return the int
     */
    public int getUserID(String username){
      int id = 0;
      String sql = "SELECT * FROM users where username='"+username+"'";
      List<Map<String, Object>> jsonObj;
        jsonObj = conn.sqlGet(sql);
        id = (int)(jsonObj.get(0)).get("id");
        return id;
    }

    /**
     * Get user by user name list.
     *
     * @param username the username
     * @return the list
     */
    public List<Map<String, Object>> getUserByUserName(String username){
        String sql = "SELECT * FROM users where username='"+username+"'";
        return conn.sqlGet(sql);
    }

    /**
     * Gets groups.
     *
     * @param userId the user id
     * @return the groups
     */
    public List<Map<String,Object>> getGroups(int userId) {
        String sql = "SELECT *\n" +
                "FROM groups as g JOIN groups_has_users as gu on g.id = gu.Groups_id\n" +
                "where users_id="+userId;
        return conn.sqlGet(sql);
    }

    /**
     * Delete user int.
     *
     * @param id the id
     * @return the int
     */
    public int deleteUser(int id){
        String sql = "UPDATE users SET deleted=true WHERE id='" + id + "';";
        return conn.sqlcreate(sql);
    }

    /**
     * Make a user private.
     *
     * @param userId id for user
     * @return success /failure value
     */
    public int updateUserToPrivate(int userId){
        String query = "UPDATE users SET isSearchable='0' where id='"+userId+"';";
        int r = conn.sqlcreate(query);
        return r<=0?-1:r;
    }

    /**
     * Function to retrieve all public users.
     *
     * @return list of public users
     */
    public List<Map<String,Object>> getNonPrivateUsers(){
      String sql = "SELECT * from users WHERE isSearchable='1';";
      return conn.sqlGet(sql);
    }

}
