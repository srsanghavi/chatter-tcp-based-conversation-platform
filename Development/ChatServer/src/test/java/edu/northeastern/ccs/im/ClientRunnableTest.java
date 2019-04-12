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
    public void testTimerIsBehind(){

        ClientTimer clientTimer = Mockito.mock(ClientTimer.class);
        NetworkConnection nc = Mockito.mock(NetworkConnection.class);
        when(nc.iterator()).thenReturn(new Iterator<Message>() {
            @Override
            public boolean hasNext() {
                return false;
            }

            @Override
            public Message next() {
                return null;
            }
        });

        ClientRunnable cr = new ClientRunnable(nc, clientTimer, false);
        when(clientTimer.isBehind()).thenReturn(true);
        try {
            cr.run();
        } catch( NullPointerException e){
            ChatLogger.info("Exception caught: " + e.toString());
        }
    }
}
