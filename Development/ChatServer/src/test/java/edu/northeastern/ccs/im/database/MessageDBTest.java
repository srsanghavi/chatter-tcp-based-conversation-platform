package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;

public class MessageDBTest {
    MessageDB messageDB;

    @BeforeEach
    void setup(){
        messageDB = new MessageDB();
    }

    @Test
    void testDeleteMessage(){
        assertEquals(1, messageDB.deleteMessage(312));
    }
}

