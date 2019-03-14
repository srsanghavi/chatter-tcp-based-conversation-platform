package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;
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
        assertTrue(conversationDB.createMessageForThread(t,user_id2,"Hello, testcase from junit.")>0);
    }

}
