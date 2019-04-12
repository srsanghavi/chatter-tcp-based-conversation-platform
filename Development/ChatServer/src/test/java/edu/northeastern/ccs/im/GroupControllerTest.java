package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.Controller.GroupController;
import edu.northeastern.ccs.im.Controller.UserController;
import edu.northeastern.ccs.im.database.GroupModel;
import edu.northeastern.ccs.im.database.UserModel;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class GroupControllerTest {

    private GroupModel mockGroupModel = Mockito.mock(GroupModel.class);

    @Mock
    private GroupController groupController;

    @Test
    public void testAddUserToGroup(){

        when(mockGroupModel.addUserToGroup(anyInt(), anyInt(), anyInt())).thenReturn(1);
        List<Map<String, Object>> arg = new ArrayList<>();
        Map<String, Object> user = new HashMap<>();
        user.put("Users_id", 21);
        user.put("is_admin", 1);
        arg.add(user);
        when(mockGroupModel.getUsersInGroups(anyInt())).thenReturn(arg);
        groupController = new GroupController(mockGroupModel);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> request = new HashMap<>();
        request.put("user_id", 1.0);
        request.put("group_id", 481.0);
        request.put("first_name", "hello");
        result = groupController.addUserToGroup("hsbudhia", request);
        assertEquals(201, result.get("result_code"));
    }

}
