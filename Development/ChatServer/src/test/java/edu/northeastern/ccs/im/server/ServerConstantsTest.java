package edu.northeastern.ccs.im.server;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;

public class ServerConstantsTest {
    
    @Test
    public void checkServerConstantInitialization(){
        int FORTYFIVE_FORTYFIVE = 4545;
        assertEquals(FORTYFIVE_FORTYFIVE, ServerConstants.getServerConstant().PORT);
    }
}
