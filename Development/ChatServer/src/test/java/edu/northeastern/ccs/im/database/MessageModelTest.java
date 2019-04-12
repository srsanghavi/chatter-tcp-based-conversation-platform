package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class MessageModelTest {
    MessageModel messageModel;

    @BeforeEach
    void setup(){
        messageModel = ModelFactory.getInstance().getMessageModel();
    }

    @Test
    void testDeleteMessage(){
        assertTrue(messageModel.deleteMessage(312) >= 0);
    }
}

