package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.Message;
import edu.northeastern.ccs.im.MessageType;
import edu.northeastern.ccs.im.NetworkConnection;
import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.client.MessageScanner;
import edu.northeastern.ccs.im.server.ClientRunnable;
import edu.northeastern.ccs.im.server.Prattle;
import edu.northeastern.ccs.im.server.ServerConstants;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.IOException;
import java.lang.reflect.Field;
import java.net.InetSocketAddress;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.TimeUnit;

import static junit.framework.TestCase.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PrattleTest {

    ConcurrentLinkedQueue<ClientRunnable> active;
    ServerSocketChannel serverSocket;
    List<IMConnection> clientTerminals;

    int serverPort = 6005;
    int numThreads = 1;


    @SuppressWarnings("unchecked")
    @BeforeEach
    void start(){
        // set up server
        try {
            serverSocket = ServerSocketChannel.open();
            serverSocket.configureBlocking(false);
            serverSocket.socket().bind(new InetSocketAddress(serverPort));
        } catch (IOException e) {
            e.printStackTrace();
            fail("couldn't set up local server");
        }

        // use reflection to access the private list of threads for the class-under-test
        try {
            Field f = Prattle.class.getDeclaredField("active");
            f.setAccessible(true);
            active = (ConcurrentLinkedQueue<ClientRunnable>) f.get(null);
        }catch(Exception e){
            e.printStackTrace();
            fail();
        }


        // set up server-side sockets to clients, each in own thread
        //clientSockets = new ArrayList<>();
        //clientSocketReaders = new ArrayList<>();
        clientTerminals = new ArrayList<>();
        try {
            for(int i=0; i<numThreads; i++) {
                setupClient(this.serverPort);

                // tell the server to accept this latest client request
                SocketChannel socket = serverSocket.accept();
                ClientRunnable runnable = new ClientRunnable(new NetworkConnection(socket));
                runnable.run();
                active.add(runnable);

            }
        }catch (Exception e){
            fail("couldn't get server to accept clients");
        }

    }

    void setupClient(int serverPort){
        // the username and password must be in our database for this to work!
        IMConnection clientTerminal = new IMConnection("127.0.0.1", serverPort, "srs");
        clientTerminal.connect();
        clientTerminals.add(clientTerminal);
    }

    @AfterEach
    void finish(){
        try{
            for(IMConnection t : clientTerminals){
                if(t.connectionActive()) {
                    t.disconnect();
                }
            };
        }catch(Exception e){
            e.printStackTrace();
        }
        for(ClientRunnable a : active){
            Prattle.removeClient(a);
        }
        try{
            serverSocket.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }




    @Test
    void checkBroadcastMessage() {
        Message testMsg = Message.makeBroadcastMessage("srs", "hi");
        Prattle.broadcastMessage(testMsg);
        // ensure all the client sockets received this!
        try {
            int cntr = 0;
            Iterator threaditerator = active.iterator();
            while(threaditerator.hasNext() && cntr < numThreads) {
                MessageScanner ms = clientTerminals.get(cntr).getMessageScanner();
                ClientRunnable thisthread = (ClientRunnable) threaditerator.next();
                thisthread.run(); thisthread.run();
                // sleep a little to let the messageScanner deal with the messages
                try{
                    TimeUnit.MILLISECONDS.sleep(400);}catch (Exception e){e.printStackTrace();}
                int matches = 0;
                while(ms.hasNext()){
                    if (ms.next().getText().equals(testMsg.getText())){
                        matches++;
                    }
                }
                cntr++;
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Test
    void checkStopServer(){
        Prattle.stopServer();
    }
}
