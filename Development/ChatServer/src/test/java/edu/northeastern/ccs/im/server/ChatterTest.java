package edu.northeastern.ccs.im.server;

import edu.northeastern.ccs.im.client.Message;
import edu.northeastern.ccs.im.MessageType;
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
import static junit.framework.TestCase.assertNull;
import static junit.framework.TestCase.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

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

            IMConnection client1 = newClient("srsanghavi","12345678");
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);

           IMConnection client2 = newClient("hsbudhia","123");
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

    private IMConnection newClient(String username,String password){
        return new IMConnection("127.0.0.1",4345,username,password);

    }

    @Test
    public void connectUserWithoutUsername(){
        SocketChannel socket;
        try {
            IMConnection client1 = newClient(null,null);
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);
            assertFalse(clientRunnable1.setUserName(null));
            assertEquals(clientRunnable1.getUserId(),-1);
            client1.sendMessage("hi");
            for(int i=0;i<10;i++) {
                clientRunnable1.run();
            }

            client1.disconnect();
        }catch (Exception e){

        }
    }

    @Test
    public void connectUserWithoutUsernameAndSendMessage(){
        SocketChannel socket;
        try {
            IMConnection client1 = newClient(null,null);
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);
            clientRunnable1.run();
            assertFalse(clientRunnable1.setUserName(null));
            assertEquals(clientRunnable1.getUserId(),-1);
            clientRunnable1.setName(null);
//            client1.sendMessage("hi");
            Message m = Message.makeBroadcastMessage("srs","sd");
            client1.socketConnection.print(m);
            clientRunnable1.run();



            client1.disconnect();
        }catch (Exception e){

        }
    }

    @Test
    public void connectUserAndFalseMsgValid(){
        SocketChannel socket;
        try {
            IMConnection client1 = newClient(null,null);
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);
            clientRunnable1.run();

            Message m1= Message.makeBroadcastMessage("","sd1");
            client1.socketConnection.print(m1);
            clientRunnable1.run();



            client1.disconnect();
        }catch (Exception e){

        }
    }

    @Test
    public void connectUserAndMessageNotBroadCast(){
        SocketChannel socket;
        try {
            IMConnection client1 = newClient("sanghavis","12345678");
            client1.connect();
            socket = serverSocket.accept();
            NetworkConnection networkConnection = new NetworkConnection(socket);
            ClientRunnable clientRunnable1 = new ClientRunnable(networkConnection);
            clientRunnable1.run();


            Message m2= Message.makeLoginMessage("hsbudhia","123");
            client1.socketConnection.print(m2);
            clientRunnable1.run();



            client1.disconnect();
        }catch (Exception e){

        }
    }
}


