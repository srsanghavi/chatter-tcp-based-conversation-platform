package edu.northeastern.ccs.im;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

public class NetworkConnectionTest {
    ServerSocketChannel serverSocket;
    NetworkConnection nc;
    @BeforeEach
    void setup(){
        try{
            serverSocket = ServerSocketChannel.open();
            serverSocket.configureBlocking(false);
            serverSocket.socket().bind(new InetSocketAddress(4345));
            SocketChannel socketChannel;
            socketChannel = serverSocket.accept();

            nc = new NetworkConnection(socketChannel);

        }catch (IOException o){
            o.printStackTrace();
        }

    }

//    @Test
//    public void nextIsNull(){
//        Message m = new Message(MessageType.BROADCAST,"hi","kjk");
//        nc.sendMessage(m);
//    }
}
