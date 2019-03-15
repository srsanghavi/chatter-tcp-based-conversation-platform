package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.NetworkConnection;
import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.server.ClientRunnable;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

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
      System.out.println(m.getThreadID());
    }

}
