package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.database.*;
import edu.northeastern.ccs.im.database.UserModel;


/**
 * Abstract UserModel that defines the basic methods all Users have
 */
public class User {

    /**
     * The Db.
     */
    UserModel db = ModelFactory.getUserModel();

    /**
     * Private Constructor to create UserModel
     *
     * @param uname     username
     * @param email     the email
     * @param pass      password
     * @param firstName the first name
     * @param lastName  the last name
     */
    public void createUser(String uname, String email, String pass, String firstName, String lastName){
        int success = db.createUser(uname, email, pass, firstName, lastName);
        if (success == 0)
            ChatLogger.info("UserModel " + uname + " successfully created");
        else
            ChatLogger.info("UserModel " + uname + " could not be created");
    }

    // Getters

    /**
     * Getuser name string.
     *
     * @param id the id
     * @return username string
     */
    public String getuserName(int id){
        return db.getUser(id).get("username").toString();
    }

    /**
     * Get first name string.
     *
     * @param id the id
     * @return firstname string
     */
    public String getFirstName(int id){
        return db.getUser(id).get("first_name").toString();
    }

    /**
     * Get last name string.
     *
     * @param id the id
     * @return lastname string
     */
    public String getLastName(int id){
        return db.getUser(id).get("last_name").toString();
    }

    /**
     * Get email string.
     *
     * @param id the id
     * @return email string
     */
    public String getEmail(int id){
        return db.getUser(id).get("email").toString();
    }
}
