package edu.northeastern.ccs.im.user;

import java.util.UUID;
import java.util.Date;

/**
 * Abstract User that defines the basic methods all Users have
 */
public abstract class User {

    private String id; // UUID
    private long creationTS; // Creation Timestamp
    private long modifiedTS; // Last Modified Timestamp
    private boolean active; // Active status
    private String username;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    private boolean dnd; // Do Not Disturb Status
    private long last_activityTS; // Last Activity Timestamp
    private boolean searchable; // Searchable?


    /**
     * Private Constructor to create User
     * @param uname username
     * @param pass password
     */
    private User(String uname, String pass){
        username = uname;
        password = pass;
        dnd = false;

        UUID uid = UUID.randomUUID();
        id = uid.toString();

        creationTS = System.currentTimeMillis()/1000;
        modifiedTS = System.currentTimeMillis()/1000;
        last_activityTS = System.currentTimeMillis()/1000;
        searchable = true;
    }

    /**
     * Creates a new User
     * @return User
     */
    public abstract User createUser();

    // Getters

    /**
     * @return isActive
     */
    public boolean isActive(){
        return active;
    }

    /**
     * @return username
     */
    public String getuserName(){
        return username;
    }

    /**
     * @return firstname
     */
    public String getFirstName(){
        if (first_name != null)
            return first_name;
        else
            return "";
    }

    /**
     * @return lastname
     */
    public String getLastName(){
        if (last_name != null)
            return last_name;
        else
            return "";
    }

    /**
     * @return email
     */
    public String getEmail(){
        if (email != null)
            return email;
        else
            return "";
    }

    /**
     * @return dnd
     */
    public boolean getDND(){
        return dnd;
    }

    /**
     * @return last_activityTS
     */
    public long getLastActivityTS(){
        return last_activityTS;
    }

    /**
     * @return searchable
     */
    public boolean isSearchable(){
        return searchable;
    }

}
