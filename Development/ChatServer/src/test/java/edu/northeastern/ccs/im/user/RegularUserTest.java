package edu.northeastern.ccs.im.user;

import org.junit.jupiter.api.Test;

public class RegularUserTest {

    @Test
    public void createUser(){

        User user = new RegularUser("ram", "ram@prattle.com", "prakash", "Ram", "Prakash");
    }

}
