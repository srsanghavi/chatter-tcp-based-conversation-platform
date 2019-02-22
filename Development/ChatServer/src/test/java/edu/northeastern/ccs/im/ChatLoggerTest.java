package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.ChatLogger;
import java.util.List;
import org.junit.jupiter.api.Test;

public class ChatLoggerTest {
    @Test
    public void checkChatLoggerError(){
        ChatLogger.error("Checking Error log");
    }

    @Test
    public void checkChatLoggerWarning(){
        ChatLogger.warning("Checking Warning log");
    }

    @Test
    public void checkChatLoggerMode(){
        ChatLogger.setMode(ChatLogger.getHandlerType("file"));
        ChatLogger.setMode(ChatLogger.getHandlerType("console"));
        ChatLogger.setMode(ChatLogger.getHandlerType("both"));
        try {
            ChatLogger.setMode(ChatLogger.getHandlerType("test"));
            ChatLogger.setMode(ChatLogger.getHandlerType("test1"));
        }
        catch(IllegalArgumentException e){
            System.out.println("IllegalArgumentExceptions caught");
        }
    }
}
