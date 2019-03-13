package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.database.UserDB;

/**
 * A regular user in the free-tier
 */
public class RegularUser extends User{

    /**
     * Private Constructor to create RegularUser
     * @param uname username
     * @param pass password
     */
    public RegularUser(String uname, String email, String pass, String firstName, String lastName){

        super(uname, pass);
        UserDB userdb = new UserDB();
        int success = userdb.createUser(uname, email, pass, firstName, lastName);
        if (success == 0)
            ChatLogger.info("User " + uname + " successfully created");
        else
            ChatLogger.info("User " + uname + " could not be created");
    }

}
