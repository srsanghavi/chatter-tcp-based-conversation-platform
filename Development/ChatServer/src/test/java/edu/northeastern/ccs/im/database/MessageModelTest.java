package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.jws.WebParam;

import static junit.framework.TestCase.assertEquals;

public class MessageModelTest {
    MessageModel messageModel;

    @BeforeEach
    void setup(){
        messageModel = ModelFactory.getInstance().getMessageModel();
    }

    @Test
    void testDeleteMessage(){
        ChatLogger.info(Integer.toString(messageModel.deleteMessage(312)));
    }
}

