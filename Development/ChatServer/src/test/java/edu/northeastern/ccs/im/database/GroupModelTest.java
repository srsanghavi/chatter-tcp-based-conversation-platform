package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static junit.framework.Assert.assertTrue;
import static junit.framework.TestCase.assertEquals;

public class GroupModelTest {
    private static GroupModel groupDB;
    private static int lastCreatedGroup;

    @BeforeAll
    static void setup(){
        groupDB = ModelFactory.getInstance().getGroupModel();
        int user_id1 = 1;
        int user_id2 = 21;
        int user_id3 = 8;
        int r = (int) groupDB.createGroup("JunitTestGroup",user_id1);
        groupDB.addUserToGroup(r,user_id2,0);
        groupDB.addUserToGroup(r,user_id3,1);
        lastCreatedGroup = r;
    }

    @Test
    public void CreateGroupAndAddMembers(){
        int user_id1 = 1;
        int user_id2 = 21;
        int user_id3 = 8;
        int r = (int) groupDB.createGroup("GroupByJunit",user_id1);
        groupDB.addUserToGroup(r,user_id2,0);
        groupDB.addUserToGroup(r,user_id3,1);
        groupDB.deleteGroupPermanently(r);
    }

    @Test
    public void testGetUsersForGroups(){
        assertEquals(3, groupDB.getUsersInGroups(lastCreatedGroup).size());
    }

    @Test
    public void testGetGroups(){
        assertTrue(groupDB.getGroups().size() > 0);
    }

    @Test
    public void testGetGroupById(){
        assertTrue(groupDB.getGroupsById(lastCreatedGroup).size() == 1);
    }

    @Test
    public void testGetGroupByName(){
        assertEquals(1, groupDB.getGroupsByName("JunitTestGroup").size());
    }

    @Test
    public void testUpdateGroupName(){
        assertEquals(1, groupDB.updateGroupName(lastCreatedGroup, "JunitTestGroupUpdated"));
    }

    @Test
    public void testDeleteUser(){
        assertEquals(0, groupDB.deleteGroup(100));
    }

    @Test
    public void testAddGroupToGroup(){
        groupDB.addGroupToGroup(332,333);
    }


    @AfterAll
    public static void cleanup(){
        groupDB.deleteGroupPermanently(lastCreatedGroup);
    }
}
