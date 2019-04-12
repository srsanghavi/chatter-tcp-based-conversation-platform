package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;
import edu.northeastern.ccs.im.database.DataCon;


public class UserModelTest {
    static UserModel userModel;
    static int lastCreatedUser;

    @BeforeAll
    public static void setup(){

//        userModel = ModelFactory.getInstance().getUserModel();

        DataCon sqliteCon = new SqliteCon();
        userModel = new UserModel(sqliteCon, new S3Model());
        userModel.createUser("junitTest","junittest@prattle.com","123","JUnit","Test");
        lastCreatedUser = userModel.lastCreatedUser();
        System.out.println(lastCreatedUser);

    }
    @Test
    public void testCreateUser(){
        userModel.createUser("junitTest1","junittest1@prattle.com","123","JUnit","Test");
        userModel.deleteUserPermanently(userModel.lastCreatedUser());
    }

    @Test
    public void testGetAllUsers(){
        userModel.getUsers();
    }

    @Test
    public void testGetFilteredUsers(){
        assertEquals(1, userModel.getUsers("email","junittest@prattle.com").size());
    }

    @Test
    public void testGetFilteredUsersByUsername(){
        assertEquals(1, userModel.getUsers("username","junitTest").size());
    }

    @Test
    public void testUserIDByUsername(){
        assertEquals(lastCreatedUser, userModel.getUserID("junitTest"));
    }

    @Test
    public void testGetFilteredUsersReturningEmptyList(){
        assertEquals(0, userModel.getUsers("email","sanghav.s@husky.neu.edu").size());
    }

    @Test
    public void testGetFilteredUsersIllegalFilterParam(){
        assertEquals(0, userModel.getUsers("emailsd","sanghav.s@husky.neu.edu").size());
    }

    @Test
    public void testAuthorized(){
        assertEquals(1,userModel.isAuthorized("junitTest", "123"));
    }

    @Test
    public void testNotAuthorized(){
        assertNotSame(1,userModel.isAuthorized("junitTest", "1234678"));
    }

    @Test
    public void testDeleteUser(){
        assertEquals(1, userModel.deleteUser(lastCreatedUser));
    }

    @Test
    public void testUpdateUserSearchable(){
        assertEquals(1, userModel.updateUserSearchable(lastCreatedUser,0));
    }

    @Test
    public void testModifyFirstName(){
        assertEquals(1, userModel.modifyUserFirstName(lastCreatedUser,"Shashwat"));
    }

    @Test
    public void testModifyLastName(){
        assertEquals(1, userModel.modifyUserLastName(lastCreatedUser,"Sanghavi"));
    }

    @AfterAll
    public static void deleteUser(){
        userModel.deleteUserPermanently(lastCreatedUser);
    }
}
