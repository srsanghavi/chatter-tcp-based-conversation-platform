package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Database methods for User
 */
public class UserDB{
    /**
     * The Mysql con.
     */
    private MysqlCon mysqlCon;

    /**
     * Instantiates a new User db.
     */
    public UserDB(){
        mysqlCon = MysqlCon.getInstance();
    }

    /**
     * Is authorized int.
     *
     * @param username the email
     * @param pass  the pass
     * @return the int (1 if authorized, 0 otherwise)
     */
    public int isAuthorized(String username,String pass){
        String sql = "SELECT user_auth('"+username+"','"+pass+"') as authorized;";
        List<Map<String, Object>> res = mysqlCon.sqlGet(sql);
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
        ChatLogger.info(Integer.toString(this.mysqlCon.sqlcreate(query)));
        return 0;
    }

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers(){
        String sql = "SELECT * FROM users";
        return mysqlCon.sqlGet(sql);
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
        return mysqlCon.sqlGet(sql);
    }

    /**
     * Returns the user with the unique id
     * @param id the unique id of the user
     * @return the user
     */
    public Map<String, Object> getUser(int id){
        String sqlUsername = "SELECT * from users WHERE id = " + id;

        return mysqlCon.sqlGet(sqlUsername).get(0);
    }

    public int getUserID(String username){
      int id = 0;
      String sql = "SELECT * FROM users where username='"+username+"'";
      List<Map<String, Object>> jsonObj;
        jsonObj = mysqlCon.sqlGet(sql);
        id = (int)(jsonObj.get(0)).get("id");
        return id;
    }
}
