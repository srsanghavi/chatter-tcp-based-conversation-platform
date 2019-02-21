import edu.northeastern.ccs.im.NetworkConnection;
import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.server.ClientRunnable;
import edu.northeastern.ccs.im.server.Prattle;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

import static junit.framework.TestCase.assertTrue;

public class ChatterTest {

    ServerSocketChannel serverSocket;
    IMConnection client;

    @BeforeEach
    public final void setUp(){
        try{
            serverSocket = ServerSocketChannel.open();
            serverSocket.configureBlocking(false);
            serverSocket.socket().bind(new InetSocketAddress(4545));

        }catch (IOException o){
            o.printStackTrace();
        }
        client = new IMConnection("127.0.0.1",4545,"Shashwat");
        System.out.println((client.connect()));
    }

    @Test
    void isConnectionSuccessful(){
        SocketChannel socket;
        try {
            socket = serverSocket.accept();

            ClientRunnable yo = new ClientRunnable(new NetworkConnection(socket));
            client.sendMessage("hi");
            client.sendMessage("hello");
            client.connect();

            for(int i=0;i<=10;i++){
                yo.run();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
