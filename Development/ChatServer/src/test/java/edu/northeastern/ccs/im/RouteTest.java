package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.Route;
import org.junit.jupiter.api.Test;

public class RouteTest {

    @Test
    public void testGetConversations(){
        System.out.println(Route.getResponseGet("getConversations/", "{user_id:1}"));
    }
}
