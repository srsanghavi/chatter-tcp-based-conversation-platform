package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;


public class UserModelTest {
    UserModel userModel;
    @BeforeEach
    public void setup(){
        userModel = ModelFactory.getInstance().getUserModel();
    }
    @Test
    public void testCreateUser(){
        userModel.createUser("hsbudhia","budhia.h@husky.neu.edu","123","Himanshu","Budhia");
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
        assertEquals(1, userModel.deleteUser(353));
    }

    @Test
    public void testUpdateUserSearchable(){
        System.out.println(userModel.updateUserSearchable(1,0));
    }

    @Test
    public void testModifyFirstName(){
        System.out.println(userModel.modifyUserFirstName(1,"Shashwat"));
    }

    @Test
    public void testModifyLastName(){
        System.out.println(userModel.modifyUserLastName(1,"Sanghavi"));
    }

}
