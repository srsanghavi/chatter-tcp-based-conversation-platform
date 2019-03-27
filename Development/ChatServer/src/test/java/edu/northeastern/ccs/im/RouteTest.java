package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.Route;
import org.junit.jupiter.api.Test;

public class RouteTest {

    @Test
    public void testGetConversations(){
        System.out.println(Route.getResponseGet("getConversations/", "{user_id:1}"));
    }

    @Test
    public void testCreateUserDuplicateUser(){
        System.out.println(Route.getResponsePost("registerUser/","{first_name:test;last_name:user;username:testUser;email:test@prattle.com;password:'12345678'}"));
    }

    @Test
    public void testBroadcastMessage(){
        ChatLogger.info(Route.getResponsePost("broadcastMessage/", "{message:'hello world';sender_id:8}"));
    }

    @Test
    public void testGetMessagesinConversation(){
        ChatLogger.info(Route.getResponseGet("getMessagesInConversation/", "{conversation_id:'205'}"));
    }
}
