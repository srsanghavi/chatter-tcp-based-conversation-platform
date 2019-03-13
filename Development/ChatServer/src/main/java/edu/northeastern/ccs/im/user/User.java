package edu.northeastern.ccs.im.user;

import java.util.UUID;
import java.util.Date;
import java.sql.Timestamp;

/**
 * Abstract User that defines the basic methods all Users have
 */
public abstract class User {

    private String id; // UUID
    private Timestamp creationTS; // Creation Timestamp
    private Timestamp modifiedTS; // Last Modified Timestamp
    private boolean active; // Active status
    private String username;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    private boolean dnd; // Do Not Disturb Status
    private Timestamp last_activityTS; // Last Activity Timestamp
    private boolean searchable; // Searchable?


    /**
     * Private Constructor to create User
     * @param uname username
     * @param pass password
     */
    public User(String uname, String pass){
        username = uname;
        password = pass;
        dnd = false;

        UUID uid = UUID.randomUUID();
        id = uid.toString();

        Date date = new Date();
        creationTS = new Timestamp(date.getTime());
        modifiedTS = new Timestamp(date.getTime());
        last_activityTS = new Timestamp(date.getTime());
        searchable = true;
    }

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

    public Timestamp getCreatedOn(){
        return creationTS;
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
    public Timestamp getLastActivityTS(){
        return last_activityTS;
    }

    /**
     * @return searchable
     */
    public boolean isSearchable(){
        return searchable;
    }

}
