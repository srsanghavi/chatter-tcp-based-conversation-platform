package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.database.UserDB;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;

public class UserTest {
    User user = new User();

    @Test
    public void createUser(){

        user.createUser("john", "john@prattle.com", "123", "John", "G");
        UserDB userdb = new UserDB();
        userdb.createUser("john", "G");
    }

    @Test
    public void getUsername(){
        String username = user.getuserName(8);
        assertEquals(username, "ram");
    }

    @Test
    public void getEmail(){
        String email = user.getEmail(8);
        assertEquals(email, "ram@prattle.com");
    }

    @Test
    public void getFirstName(){
        String firstName = user.getFirstName(8);
        assertEquals(firstName, "Ram");
    }

    @Test
    public void getLastName(){
        String firstName = user.getLastName(8);
        assertEquals(firstName, "Prakash");
    }

}
