package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.server.Prattle;
import edu.northeastern.ccs.im.server.ServerConstants;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.lang.reflect.Field;

import static junit.framework.TestCase.fail;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PrattleMainTest {


    @Test
    void main() {
        try {
            Field f = Prattle.class.getDeclaredField("counterForTest");
            f.setAccessible(true);
            f.set(null, 100);
        }catch(Exception e){
            e.printStackTrace();
            fail("could not set breakLoopAfter via reflection");
        }

        try {
            String[] args = new String[1];
            Thread t1 = new Thread(() -> {
                try{
                    Prattle.main(args);
                }catch (Exception e){fail();e.printStackTrace();}
            });
            t1.start();
            Thread t2 = new Thread(() -> {
                // set up client thread
                IMConnection clientTerminal = new IMConnection("127.0.0.1", 4545, "srs");
                clientTerminal.connect();
                clientTerminal.sendMessage("this is a message!");
                clientTerminal.disconnect();
            });
            t2.start();
        }catch (Exception e){
            e.printStackTrace();
            fail("main did not work with valid args");
        }
    }




}