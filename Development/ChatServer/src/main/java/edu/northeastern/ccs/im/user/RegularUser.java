package edu.northeastern.ccs.im.user;


/**
 * A regular user in the free-tier
 */
public class RegularUser extends User{

    /**
     * Private Constructor to create RegularUser
     * @param uname username
     * @param pass password
     */
    public RegularUser(String uname, String pass){
        super(uname, pass);
        SerializeUser serializer = new SerializeUser();
        serializer.createUserInDB(this, pass);
    }

}
