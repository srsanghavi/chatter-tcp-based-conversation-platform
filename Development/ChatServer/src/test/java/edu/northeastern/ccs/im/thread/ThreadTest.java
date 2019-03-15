package edu.northeastern.ccs.im.thread;

import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.NetworkConnection;
import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.conversation.Conversation;
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


public class ThreadTest {

  @Test
  public void checkThreadCreation(){
    Message mHimanshuToShashwat = Message.makeBroadcastMessage("hsbudhia","srsanghavi::Test " +
            "thread creation.");
    Message mShashwatToHimanshu = Message.makeBroadcastMessage("hsbudhia","srsanghavi::Test " +
            "thread creation.");
    Conversation conversation = new Conversation();
    Thread thread = new Thread(mHimanshuToShashwat.getMessageID(),conversation.getId());
    System.out.println(thread.getThreadID());
  }

  @Test
  public void checkAddMessageToThread(){
    Message m1 = Message.makeBroadcastMessage("hsbudhia","srsanghavi::" +
            "Message from Thread test.");
    Message m2 = Message.makeBroadcastMessage("hsbudhia","srsanghavi::Message " +
            "from Thread test.");
    Conversation conversation = new Conversation();
    Thread thread = new Thread(m1.getMessageID(),conversation.getId());
    thread.addMessageToThread(m2.getMessageID());
  }
  
}
