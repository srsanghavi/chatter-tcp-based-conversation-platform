package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;
import static junit.framework.TestCase.assertTrue;


public class UserDBTest {
    UserDB userDB;
    @BeforeEach
    public void setup(){
        userDB = new UserDB();
    }
    @Test
    public void testCreateUser(){
        userDB.createUser("hsbudhia","budhia.h@husky.neu.edu","123","Himanshu","Budhia");
    }

    @Test
    public void testGetAllUsers(){
        System.out.println(userDB.getUsers());
    }

    @Test
    public void testGetFilteredUsers(){
        System.out.println(userDB.getUsers("email","sanghavi.s@husky.neu.edu"));
    }

    @Test
    public void testGetFilteredUsersByUsername(){
        System.out.println(userDB.getUsers("username","srsanghavi"));
    }

    @Test
    public void testUserIDByUsername(){
        System.out.println(userDB.getUserID("hsbudhia"));
    }

    @Test
    public void testGetFilteredUsersReturningEmptyList(){
        System.out.println(userDB.getUsers("email","sanghav.s@husky.neu.edu"));
    }

    @Test
    public void testGetFilteredUsersIllegalFilterParam(){
        System.out.println(userDB.getUsers("emailsd","sanghav.s@husky.neu.edu"));
    }

    @Test
    public void testAuthorized(){
        assertEquals(1,userDB.isAuthorized("srsanghavi", "12345678"));
    }

    @Test
    public void testNotAuthorized(){
        assertNotSame(1,userDB.isAuthorized("sanghavi.s@husky.neu.edu", "1234678"));
    }


}
