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
import static junit.framework.TestCase.assertTrue;


public class MessageTest {


    @Test
    public void checkInitialMessageAndGetText(){
        Message m = Message.makeSimpleLoginMessage("srs");
        assertTrue(m.isInitialization());
        assertEquals(null,m.getText());
    }

    @Test
    public void checkToStringForNullUser(){
        Message m = Message.makeSimpleLoginMessage(null);
        assertEquals("HLO 2 -- 2 --",m.toString());
    }
}
