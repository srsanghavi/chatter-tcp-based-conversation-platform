package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.ChatLogger;
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
}
