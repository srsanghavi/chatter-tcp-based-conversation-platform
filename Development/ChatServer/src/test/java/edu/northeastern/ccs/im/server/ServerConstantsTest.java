package edu.northeastern.ccs.im.server;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;

public class ServerConstantsTest {
    
    @SuppressWarnings("")
    @Test
    public void checkServerConstantInitialization(){
        assertEquals(ServerConstants.getServerConstant().PORT,4545);
    }
}
