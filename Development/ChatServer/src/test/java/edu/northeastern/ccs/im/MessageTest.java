package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.Route;
import org.junit.jupiter.api.Test;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertNull;
import static junit.framework.TestCase.assertTrue;


public class MessageTest {


    @Test
    public void checkInitialMessageAndGetText(){
        Message m = Message.makeSimpleLoginMessage("srs","123");
        assertTrue(m.isInitialization());
        assertFalse(m.isBroadcastMessage());
        assertEquals("123",m.getText());
    }

    @Test
    public void checkToStringForNullUser(){
        Message m = Message.makeSimpleLoginMessage(null,null);
        assertEquals("HLO 2 -- 2 --",m.toString());
    }

    @Test
    public void checkMakeHelloMessage(){
        Message m = Message.makeHelloMessage("Hello");
        assertEquals("HLO 2 -- 5 Hello",m.toString());
    }

    @Test
    public void isABroadcastMessage(){
        Message m = Message.makeBroadcastMessage("Hell","lo");
        assertTrue(m.isBroadcastMessage());
        assertFalse(m.isInitialization());
        assertFalse(m.terminate());
    }

    @Test
    public void testMakeMessage(){
        Message newMsg = Message.makeMessage("",null,null);
        assertNull(newMsg);
    }

    @Test
  public void testStoreMessageInDB(){
      Message m = Message.makeBroadcastMessage("hsbudhia","srsanghavi::Hi, testing " +
              "from JUnit for message store in DB.");
      m.storeMessageInDb();
      System.out.println(m.getMessageID());
      System.out.println(m.getMessageSenderUsername());
      System.out.println(m.getMessageText());
      System.out.println(m.getCreationTS());
      System.out.println(m.getThreadId());
    }

    @Test
  public void testMakeAPIMessage(){
      Message.makeApiMessage("hsbudhia","API message text for test");
    }

    @Test
  public void testIsAPIMessage(){
      Message m = Message.makeApiMessage("hsbudhia","API message text for test");
      assertTrue(m.isApiMessage());
    }

    @Test
  public void testMakeNotificationMessage(){
      Message.makeNotificationMessage("hsbudhia","Notification message text for test");
    }

}
