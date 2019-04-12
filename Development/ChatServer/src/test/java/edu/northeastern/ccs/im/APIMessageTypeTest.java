package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.ApiMessageType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class APIMessageTypeTest {

    @Test
    public void testGetUsers(){
        assertEquals("getUserByUsername/", ApiMessageType.GET_USER_BY_USERNAME);
    }
}
