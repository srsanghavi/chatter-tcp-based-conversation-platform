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

public class ChatterTest {

    ServerSocketChannel serverSocket;

    @BeforeEach
    public final void setUp(){
        try{
            serverSocket = ServerSocketChannel.open();
            serverSocket.configureBlocking(false);
            serverSocket.socket().bind(new InetSocketAddress(4345));

        }catch (IOException o){
            o.printStackTrace();
        }
    }

    @AfterEach
    public final void tearDown() {
        try {
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    @Test
    void multipleClientsCanConnectAndCommunicate(){
        SocketChannel socket;
        try {

            IMConnection client1 = newClient("Shashwat");
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);

           IMConnection client2 = newClient("Himanshu");
            client2.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection1 = new NetworkConnection(socket);
            ClientRunnable clientRunnable2 = new ClientRunnable(networkConnection1);

            client1.sendMessage("Hello");
            client2.sendMessage("Hi");

            client1.disconnect();

            try{
            for(int i=0;i<10;i++) {
                clientRunnable1.run();
                clientRunnable2.run();
            }
            }catch (Exception e){

            }


        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private IMConnection newClient(String username){
        return new IMConnection("127.0.0.1",4345,username);

    }

    @Test
    public void connectUserWithoutUsername(){
        SocketChannel socket;
        try {
            IMConnection client1 = newClient(null);
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);

            client1.sendMessage("hi");
            clientRunnable1.run();
            client1.disconnect();
        }catch (Exception e){

        }
    }
}
