package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static junit.framework.TestCase.assertEquals;

public class GroupDBTest {
    GroupDB groupDB;

    @BeforeEach
    void setup(){
        groupDB = new GroupDB();
    }

    @Test
    public void CreateGroupAndAddMembers(){
        int user_id1 = 1;
        int user_id2 = 21;
        int user_id3 = 8;
        int r = (int) groupDB.createGroup("GroupByJunit",user_id1);
        groupDB.addUserToGroup(r,user_id2,0);
        groupDB.addUserToGroup(r,user_id3,1);
    }

    @Test
    public void testGetUsersForGroups(){
        ChatLogger.info(groupDB.getUsersInGroups(4).toString());
    }

    @Test
    public void testGetGroups(){
        ChatLogger.info(groupDB.getGroups().toString());
    }

    @Test
    public void testGetGroupById(){
        ChatLogger.info(groupDB.getGroupsById(4).toString());
    }

    @Test
    public void testGetGroupByName(){
        ChatLogger.info(groupDB.getGroupsByName("GroupByJunit").toString());
    }

    @Test
    public void testUpdateGroupName(){
        ChatLogger.info(Integer.toString(groupDB.updateGroupName(101, "UpdatedGroupName")));
    }

    @Test
    public void testDeleteUser(){
        assertEquals(1, groupDB.deleteGroup(100));
    }
}
