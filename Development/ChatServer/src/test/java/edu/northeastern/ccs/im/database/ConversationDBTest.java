package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import edu.northeastern.ccs.im.server.ChatterTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ConversationDBTest {
    ConversationDB conversationDB;

    @BeforeEach
    void setup(){
        conversationDB=new ConversationDB();
    }
    @Test
    public void createConversation(){
        int r = conversationDB.createConversationForUser(1,8);
        ChatLogger.info(String.valueOf(r));
    }

    @Test
    public void testCreateThreadAndMessage(){
        int user_id1 = 1;
        int user_id2 = 21;
        int r = conversationDB.createConversationForUser(user_id1,user_id2);
        int t = conversationDB.createThreadForConversation(r);
        ChatLogger.info("Conversation ID:"+String.valueOf(r));
        ChatLogger.info("Thread ID:" +String.valueOf(t));
        assertTrue(conversationDB.createMessageForThread(t,user_id2,"Hello, testcase from junit - 2.")>0);
    }

    @Test
    public void testMultipleThreadFromUsers() {
        int user_id1 = 1;
        int user_id2 = 21;
        int r = conversationDB.createConversationForUser(user_id1, user_id2);
        int t = conversationDB.createThreadForConversation(r);
        System.out.println(String.valueOf(r));
        System.out.println(String.valueOf(t));
        int e = conversationDB.createThreadForConversation(r);
        System.out.println(String.valueOf(e));
    }

    @Test
    public void testGetMessagesInAConversation(){
        int user_id1 = 1;
        int user_id2 = 21;
        int r = conversationDB.createConversationForUser(user_id1,user_id2);
        ChatLogger.info("Conversation ID:"+String.valueOf(r));
        ChatLogger.info("Messages For Conversation: "+conversationDB.getMessagesForConversation(r));
    }

    @Test
    public void testGetConversations(){
        ChatLogger.info(conversationDB.getConversations().toString());
    }

    @Test
    public void testGetConversationsById(){
        ChatLogger.info(conversationDB.getConversationsById(24).toString());
    }

    @Test
    public void testGetThreadsForConversation(){
        ChatLogger.info(conversationDB.getThreadsForConversation(21).toString());
    }

    @Test
    public void testUserUserCreateConversationForNoRealUser(){
        assertTrue(conversationDB.createConversationForUser(1,50)<=0);
    }

    @Test
    public void  testGetConversationsForUser(){
        System.out.println(ConversationDB.getConversations(1));
    }
}
