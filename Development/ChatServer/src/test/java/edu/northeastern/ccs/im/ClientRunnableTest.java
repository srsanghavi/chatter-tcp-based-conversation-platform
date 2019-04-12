package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.server.ClientRunnable;
import edu.northeastern.ccs.im.server.ClientTimer;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.util.reflection.FieldSetter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

public class ClientRunnableTest {

    @Test
    public void testBroadCastMessageAndTime(){

        ClientTimer clientTimer = Mockito.mock(ClientTimer.class);
        NetworkConnection nc = Mockito.mock(NetworkConnection.class);
        when(nc.iterator()).thenReturn(new Iterator<Message>() {
            @Override
            public boolean hasNext() {
                return true;
            }

            @Override
            public Message next() {
                return new Message(MessageType.BROADCAST, "hsbudhia", "API 4 john 22 getAllGroups/::GET::{}");
            }
        });

        ClientRunnable cr = new ClientRunnable(nc, clientTimer, false, false, "hsbudhia");
        when(clientTimer.isBehind()).thenReturn(true);
        try {
            cr.run();
        } catch( NullPointerException e){
            ChatLogger.info("Exception caught: " + e.toString());
        }
    }

    @Test
    public void testAPIMessageGET(){

        ClientTimer clientTimer = Mockito.mock(ClientTimer.class);
        NetworkConnection nc = Mockito.mock(NetworkConnection.class);
        when(nc.iterator()).thenReturn(new Iterator<Message>() {
            @Override
            public boolean hasNext() {
                return true;
            }

            @Override
            public Message next() {
                return Message.makeApiMessage("hsbudhia", "API 4 john 22 getAllGroups/::GET::{}");
            }
        });

        ClientRunnable cr = new ClientRunnable(nc, clientTimer, false, true, "hsbudhia");
        when(clientTimer.isBehind()).thenReturn(true);
        try {
            cr.run();
        } catch( NullPointerException e){
            ChatLogger.info("Exception caught: " + e.toString());
        }
    }

    @Test
    public void testAPIMessagePOST(){

        ClientTimer clientTimer = Mockito.mock(ClientTimer.class);
        NetworkConnection nc = Mockito.mock(NetworkConnection.class);
        when(nc.iterator()).thenReturn(new Iterator<Message>() {
            @Override
            public boolean hasNext() {
                return true;
            }

            @Override
            public Message next() {
                return Message.makeApiMessage("hsbudhia", "API 4 john 63 updateGroupName/::POST::{group_name:ThisWasEdited,group_id:428}");
            }
        });

        ClientRunnable cr = new ClientRunnable(nc, clientTimer, false, true, "hsbudhia");
        when(clientTimer.isBehind()).thenReturn(true);
        try {
            cr.run();
        } catch( NullPointerException e){
            ChatLogger.info("Exception caught: " + e.toString());
        }
    }
}
