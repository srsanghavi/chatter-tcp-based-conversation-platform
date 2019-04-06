package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;


public class UserModelTest {
    UserModel userModel;
    int lastCreatedUser;
    @BeforeEach
    public void setup(){
        userModel = ModelFactory.getInstance().getUserModel();
    }
    @Test
    public void testCreateUser(){
        userModel.createUser("junitBot","junitbot@prattle.com","123","JUnit","Bot");
        lastCreatedUser = userModel.lastCreatedUser();
    }

    @Test
    public void testGetAllUsers(){
        System.out.println(userModel.getUsers());
    }

    @Test
    public void testGetFilteredUsers(){
        System.out.println(userModel.getUsers("email","sanghavi.s@husky.neu.edu"));
    }

    @Test
    public void testGetFilteredUsersByUsername(){
        System.out.println(userModel.getUsers("username","srsanghavi"));
    }

    @Test
    public void testUserIDByUsername(){
        System.out.println(userModel.getUserID("hsbudhia"));
    }

    @Test
    public void testGetFilteredUsersReturningEmptyList(){
        System.out.println(userModel.getUsers("email","sanghav.s@husky.neu.edu"));
    }

    @Test
    public void testGetFilteredUsersIllegalFilterParam(){
        System.out.println(userModel.getUsers("emailsd","sanghav.s@husky.neu.edu"));
    }

    @Test
    public void testAuthorized(){
        assertEquals(1,userModel.isAuthorized("srsanghavi", "12345678"));
    }

    @Test
    public void testNotAuthorized(){
        assertNotSame(1,userModel.isAuthorized("sanghavi.s@husky.neu.edu", "1234678"));
    }

    @Test
    public void testDeleteUser(){
        assertEquals(1, userModel.deleteUser(1167));
    }
}
