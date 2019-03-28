package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.database.*;


/**
 * Abstract User that defines the basic methods all Users have
 */
public class User {

    /**
     * Private Constructor to create User
     * @param uname username
     * @param pass password
     */
    public void createUser(String uname, String email, String pass, String firstName, String lastName){
        UserDB userdb = new UserDB();
        int success = userdb.createUser(uname, email, pass, firstName, lastName);
        if (success == 0)
            ChatLogger.info("User " + uname + " successfully created");
        else
            ChatLogger.info("User " + uname + " could not be created");
    }

    // Getters

    /**
     * @return username
     */
    public String getuserName(int id){
        UserDB db = new UserDB();
        return db.getUser(id).get("username").toString();
    }

    /**
     * @return firstname
     */
    public String getFirstName(int id){
        UserDB db = new UserDB();
        return db.getUser(id).get("first_name").toString();
    }

    /**
     * @return lastname
     */
    public String getLastName(int id){
        UserDB db = new UserDB();
        return db.getUser(id).get("last_name").toString();
    }

    /**
     * @return email
     */
    public String getEmail(int id){
        UserDB db = new UserDB();
        return db.getUser(id).get("email").toString();
    }
}
