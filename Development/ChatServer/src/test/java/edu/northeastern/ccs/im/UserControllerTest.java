package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.Controller.UserController;
import edu.northeastern.ccs.im.database.MysqlCon;
import edu.northeastern.ccs.im.database.S3Model;
import edu.northeastern.ccs.im.database.UserModel;
import edu.northeastern.ccs.im.database.DataCon;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    private UserModel mockUserModel = Mockito.mock(UserModel.class);
    private UserController userController;

    @Test
    public void testModifyUserFirstName(){

        when(mockUserModel.modifyUserFirstName(anyInt(), anyString())).thenReturn(-1);
        userController = new UserController(mockUserModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("first_name", "hello");
        result = userController.modifyUser(request);
        assertEquals(500, result.get("result_code"));
    }

    @Test
    public void testModifyUserLastName(){

        when(mockUserModel.modifyUserLastName(anyInt(), anyString())).thenReturn(-1);
        userController = new UserController(mockUserModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("last_name", "hello");
        result = userController.modifyUser(request);
        assertEquals(500, result.get("result_code"));
    }

    @Test
    public void testModifyUserIsSearchable(){

        when(mockUserModel.updateUserSearchable(anyInt(), anyInt())).thenReturn(-1);
        userController = new UserController(mockUserModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("isSearchable", true);
        result = userController.modifyUser(request);
        assertEquals(500, result.get("result_code"));
    }

    @Test
    public void testModifyPreferredLanguage(){

        when(mockUserModel.modifyPreferredLanguage(anyInt(), anyString())).thenReturn(-1);
        userController = new UserController(mockUserModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("preferredLanguage", "english");
        result = userController.modifyUser(request);
        assertEquals(500, result.get("result_code"));
    }

    @Test
    public void testModifyProfilePicture(){

        when(mockUserModel.updateProfilePicture(anyInt(), anyString())).thenReturn("");
        userController = new UserController(mockUserModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("profilePicture", "asd");
        request.put("profile_picture", "asd");
        result = userController.modifyUser(request);
        assertEquals(500, result.get("result_code"));
    }

    @Test
    public void testOnlineUsers(){

        when(mockUserModel.getOnlineUsers()).thenReturn(new ArrayList<>());
        userController = new UserController(mockUserModel);
        assertEquals(0, userController.getOnlineUsers().size());
    }
}
