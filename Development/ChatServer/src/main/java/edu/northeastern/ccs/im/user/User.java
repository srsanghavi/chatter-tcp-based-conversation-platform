package edu.northeastern.ccs.im.user;

import java.util.UUID;
import java.util.Date;

public abstract class User {
    private String id;
    private long creationTS;
    private long modifiedTS;
    private boolean active;
    private String username;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    private boolean dnd;
    private long last_activityTS;
    private boolean searchable;


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

    public abstract User createUser();

    // Getters

    public boolean isActive(){
        return active;
    }

    public String getuserName(){
        return username;
    }

    public String getFirstName(){
        if (first_name != null)
            return first_name;
        else
            return "";
    }

    public String getLastName(){
        if (last_name != null)
            return last_name;
        else
            return "";
    }

    public String getEmail(){
        if (email != null)
            return email;
        else
            return "";
    }

    public boolean getDND(){
        return dnd;
    }

    public long getLastActivityTS(){
        return last_activityTS;
    }

    public boolean isSearchable(){
        return searchable;
    }

}
