package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;

public class MessageModelTest {
    MessageModel messageModel;

    @BeforeEach
    void setup(){
        messageModel = ModelFactory.getMessageModel();
    }

    @Test
    void testDeleteMessage(){
        assertEquals(1, messageModel.deleteMessage(312));
    }
}

