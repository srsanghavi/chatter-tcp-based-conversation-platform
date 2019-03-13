package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * The type User db.
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
     * @param email the email
     * @param pass  the pass
     * @return the int (1 if authorized, 0 otherwise)
     */
    public int isAuthorized(String email,String pass){
        String sql = "SELECT user_auth('"+email+"','"+pass+"') as authorized;";
        try {
            List<Map<String, Object>> res = mysqlCon.sqlGet(sql);
            return (int) res.get(0).get("authorized");
        } catch (SQLException e) {
            ChatLogger.warning(e.toString());
        }
        return 0;
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
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("INSERT INTO users(username,first_name,last_name, email, password) VALUES (\"");
        stringBuilder.append(username);
        stringBuilder.append("\" , \"");
        stringBuilder.append(firstName);
        stringBuilder.append("\" , \"");
        stringBuilder.append(lastName);
        stringBuilder.append("\" , \"");
        stringBuilder.append(email);
        stringBuilder.append("\" , ");
        stringBuilder.append("MD5('"+password+"')");
        stringBuilder.append(");");
        String query = stringBuilder.toString();
        ChatLogger.info("Executing: " + query);
        try {
            System.out.println(this.mysqlCon.sqlcreate(query));
        } catch (SQLException e) {
            ChatLogger.error(e.getMessage());
            return -1;
        }
        return 0;
    }

    /**
     * Get users list.
     *
     * @return the list
     */
    public List<Map<String, Object>> getUsers(){
        String sql = "SELECT * FROM users";
        try {
            return mysqlCon.sqlGet(sql);
        } catch (SQLException e) {
            ChatLogger.error(e.getMessage());
        }
        return null;
    }


    /**
     * Get users list.
     *
     * @param filterBy the filter by accepted value = email, first_name, last_name, username
     * @param value    the value
     * @return the list
     */
    public List<Map<String, Object>> getUsers(String filterBy,String value){
        if(!filterBy.equals("email") && !filterBy.equals("first_name") && !filterBy.equals("last_name")){
            ChatLogger.error("Illegal filter name passed. Available filter names : email, first_name, last_name");
            return Collections.emptyList();
        }
        String sql = "SELECT * FROM users where "+filterBy+"='"+value+"'";
        try {
            return mysqlCon.sqlGet(sql);
        } catch (SQLException e) {
            ChatLogger.error(e.getMessage());
        }
        return Collections.emptyList();
    }
}
