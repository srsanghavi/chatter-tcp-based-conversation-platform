package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotSame;

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
}
