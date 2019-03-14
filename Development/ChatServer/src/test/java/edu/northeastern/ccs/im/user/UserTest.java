package edu.northeastern.ccs.im.user;

import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;

public class UserTest {
    User user = new User();

    @Test
    public void createUser(){

        user.createUser("ram", "ram@prattle.com", "prakash", "Ram", "Prakash");
    }

    @Test
    public void getUsername(){
        String username = user.getuserName(8);
        assertEquals(username, "ram");
    }

}
