package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.ApiMessageType;
import edu.northeastern.ccs.im.api.Route;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RouteTest {
    ApiMessageType apiType;
    @BeforeEach
    void setUp(){
         apiType = new ApiMessageType();
    }
    @Test
    public void testGetConversations(){
        System.out.println(Route.getResponseGet("srsanghavi","getConversations/", "{user_id:1}"));
    }

    @Test
    public void testCreateUserDuplicateUser(){
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{first_name:test;last_name:user;username:testUser;email:test@prattle.com;password:'12345678'}"));
    }

    @Test
    public void testGetUserGroups(){
        System.out.println(Route.getResponseGet("srsanghavi","getGroups/","{user_id:1}"));
    }

    @Test
    public void testBroadcastMessage(){
        ChatLogger.info(Route.getResponsePost("srsanghavi","broadcastMessage/", "{message:'hello world';sender_id:8}"));
    }

    @Test
    public void testGetMessagesinConversation(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getMessagesInConversation/", "{conversation_id:'205'}"));
    }

    @Test
    public void testGetMessagesinThread(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getMessagesInThread/", "{thread_id:'562'}"));
    }

    @Test
    public void testGetAllGroups(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getAllGroups/", "{user_id:'8'}"));
    }

    @Test
    public void testDeleteUser(){
        ChatLogger.info(Route.getResponsePost("srsanghavi", "deleteUser/","{user_id:1}"));
    }

    @Test
  public void testGetUserFromGroup(){
      ChatLogger.info(Route.getResponseGet("hsbudhia","getGroupUsers/","{group_id:199}"));
    }

    @Test
  public void testGetThreadInConversation(){
      ChatLogger.info(Route.getResponseGet("hsbudhia","getThreadsInConversation/","{conversation_id:407}"));
    }
}
