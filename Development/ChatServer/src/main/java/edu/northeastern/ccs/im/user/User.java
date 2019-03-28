package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.database.*;
import edu.northeastern.ccs.im.database.UserModel;


/**
 * Abstract UserModel that defines the basic methods all Users have
 */
public class User {

    /**
     * Private Constructor to create UserModel
     * @param uname username
     * @param pass password
     */
    public void createUser(String uname, String email, String pass, String firstName, String lastName){
        UserModel userdb = new UserModel();
        int success = userdb.createUser(uname, email, pass, firstName, lastName);
        if (success == 0)
            ChatLogger.info("UserModel " + uname + " successfully created");
        else
            ChatLogger.info("UserModel " + uname + " could not be created");
    }

    // Getters

    /**
     * @return username
     */
    public String getuserName(int id){
        UserModel db = new UserModel();
        return db.getUser(id).get("username").toString();
    }

    /**
     * @return firstname
     */
    public String getFirstName(int id){
        UserModel db = new UserModel();
        return db.getUser(id).get("first_name").toString();
    }

    /**
     * @return lastname
     */
    public String getLastName(int id){
        UserModel db = new UserModel();
        return db.getUser(id).get("last_name").toString();
    }

    /**
     * @return email
     */
    public String getEmail(int id){
        UserModel db = new UserModel();
        return db.getUser(id).get("email").toString();
    }
}
