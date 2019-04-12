package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/**
 * Database methods for UserModel
 */
public class UserModel {
    /**
     * The connection
     */
    private DataCon conn;
    private MediaCon mconn;
    private final String profileLocation = "https://s3.amazonaws.com/cs5500/u/";

    /**
     * Instantiates a new UserModel db.
     *
     * @param connection the connection
     */
    public UserModel(DataCon connection, MediaCon mconnection){
        conn = connection;
        mconn = mconnection;
    }

    /**
     * Is authorized int.
     *
     * @param username the email
     * @param pass     the pass
     * @return the int (1 if authorized, 0 otherwise)
     */
    public int isAuthorized(String username,String pass){
        List<String> arguments = new ArrayList<>();
        String query = "SELECT * from users WHERE username=?;";
        arguments.add(username);
        List<Map<String, Object>> res = conn.sqlGet(query, arguments);
        String p = (String) res.get(0).get("password");
        if (p.equals(MD5(pass)))
            return 1;
        else
            return 0;
    }

    /**
     * https://www.geeksforgeeks.org/md5-hash-in-java/
     * @param s
     * @return
     */
    public String MD5(String s){
        try {

            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            //  of an input digest() return array of byte
            byte[] messageDigest = md.digest(s.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);

            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }

        // For specifying wrong message digest algorithms
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
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
        String query = "INSERT INTO users(username,first_name,last_name, email, password) VALUES (?, ?, ?, ?, ?);";

        List<String> arguments = new ArrayList<>(Arrays.asList(username, firstName, lastName, email, MD5(password)));
        ChatLogger.info("Executing: " + query);
        ChatLogger.info(email);
        return conn.sqlcreate(query, arguments);
    }

    /**
     * Create user int.
     *
     * @param username the username
     * @param password the password
     * @return the int
     */
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
        String query;
        switch(filterBy) {
            case "email":
                query = "SELECT * FROM users where email=?;";
                break;
            case "first_name":
                query = "SELECT * FROM users where first_name=?;";
                break;
            case "last_name":
                query = "SELECT * FROM users where last_name=?;";
                break;
            case "username":
                query = "SELECT * FROM users where username=?;";
                break;
            default:
                ChatLogger.error("Illegal filter name passed. Available filter names : email, first_name, last_name");
                return Collections.emptyList();
        }
        return conn.sqlGet(query, new ArrayList<>(Arrays.asList(value)));
    }

    /**
     * Returns the user with the unique id
     *
     * @param id the unique id of the user
     * @return the user
     */
    public Map<String, Object> getUser(int id){
        String sqlUsername = "SELECT * from users WHERE id = ?";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlGet(sqlUsername, args).get(0);
    }

    /**
     * Get user id int.
     *
     * @param username the username
     * @return the int
     */
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

    /**
     * Get user by user name list.
     *
     * @param username the username
     * @return the list
     */
    public List<Map<String, Object>> getUserByUserName(String username){
        String sql = "SELECT * FROM users where username=?;";
        List<String> args = new ArrayList<>();
        args.add(username);
        return conn.sqlGet(sql, args);
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
                "where users_id=?";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(userId));
        return conn.sqlGet(sql, args);
    }

    /**
     * Delete user int.
     *
     * @param id the id
     * @return the int
     */
    public int deleteUser(int id){
        String sql = "UPDATE users SET deleted=true WHERE id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlcreate(sql, args);
    }

    /**
     * Make a user private.
     *
     * @param userId id for user
     * @return success /failure value
     */
    public int updateUserToPrivate(int userId) {
        String query = "UPDATE users SET isSearchable='0' where id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(userId));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

    public int updateUserSearchable(int userId, int isSearchable){
        String query = "UPDATE users SET isSearchable=? where id=?;";
        List<String> args = new ArrayList<>(Arrays.asList(Integer.toString(isSearchable), Integer.toString(userId)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

    /**
     * Function to retrieve all public users.
     *
     * @return list of public users
     */
    public List<Map<String,Object>> getNonPrivateUsers(){
      String sql = "SELECT * from users WHERE isSearchable='1';";
      return conn.sqlGet(sql, new ArrayList<>());
    }

    public int modifyUserFirstName(int userId, String name){
        String query = "UPDATE users SET first_name =? where id=?;";
        List<String> args = new ArrayList<>(Arrays.asList(name, Integer.toString(userId)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

    public int modifyUserLastName(int userId, String name){
        String query = "UPDATE users SET last_name =? where id=?;";
        List<String> args = new ArrayList<>(Arrays.asList(name, Integer.toString(userId)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

    public String updateProfilePicture(int userid, String file){
        String[] parts = file.split("\\.");
        String extension = parts[parts.length -1];

        String currentPicture = "u/" + userid + "." + extension;
        String tempPicture = file.replace("https://s3.amazonaws.com/cs5500/", "");
        mconn.deleteObject(currentPicture);
        mconn.moveObject(tempPicture, currentPicture);
        String url = profileLocation + userid + "." + extension;

        String query = "UPDATE users SET profile_picture=? where id=?;";
        List<String> args = new ArrayList<>(Arrays.asList(url, Integer.toString(userid)));
        int r = conn.sqlcreate(query, args);
        if (r <=0 )
            return "";
        else
            return url;

    }

    /**
     * Delete user record permanently
     * @param id User ID
     * @return Result code
     */
    public int deleteUserPermanently(int id){
        String query = "DELETE FROM users WHERE id=?";
        List<String> args = new ArrayList<>(Arrays.asList(Integer.toString(id)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

    /**
     * Modify preferred language
     * @param userID User ID
     * @param language the preferred language
     * @return result code
     */
    public int modifyPreferredLanguage(int userID, String language){
        String query = "UPDATE users SET preferredLanguage ='"+ language +"' where id='"+ userID +"';";
        List<String> args = new ArrayList<>(Arrays.asList(language, Integer.toString(userID)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }

}
