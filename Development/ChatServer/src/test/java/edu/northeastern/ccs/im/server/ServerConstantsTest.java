package edu.northeastern.ccs.im.server;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;

public class ServerConstantsTest {
    
    @Test
    public void checkServerConstantInitialization(){
        assertEquals(4545, ServerConstants.getServerConstant().PORT);
    }
}
