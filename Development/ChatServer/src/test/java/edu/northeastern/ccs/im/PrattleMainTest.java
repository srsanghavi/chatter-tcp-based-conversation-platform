package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.client.IMConnection;
import edu.northeastern.ccs.im.server.Prattle;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.lang.reflect.Field;

import static junit.framework.TestCase.fail;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PrattleMainTest {


    @Test
    void checkMain() {
        try {
            Field f = Prattle.class.getDeclaredField("counterForTest");
            f.setAccessible(true);
            f.set(null,100);
        }catch(Exception e){
            e.printStackTrace();
            fail("could not set counterForTest via reflection");
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
                for(int i=0;i<100000;i++){

                }
                IMConnection clientTerminal = new IMConnection("", 4545, "srs");
                clientTerminal.connect();
                clientTerminal.sendMessage("this is a message!");

                clientTerminal.disconnect();
            });
            t2.start();
            t1.join();
            t2.join();

        }catch (Exception e){
            e.printStackTrace();
            fail("main did not work with valid args");
        }
    }


    @Test
    void checkMainWithoutCounterForTest() {
        try {
            Field f = Prattle.class.getDeclaredField("counterForTest");
            f.setAccessible(true);
            f.set(null,100);
        }catch(Exception e){
            e.printStackTrace();
            fail("could not set counterForTest via reflection");
        }

        try {
            String[] args = new String[1];
            Thread t1 = new Thread(() -> {
                try{
                    Prattle.main(args);
                }catch (Exception e){fail();}
            });
            t1.start();

            Thread t2 = new Thread(() -> {
                // set up client thread
                try{
                    Prattle.main(args);
                }catch (Exception e){fail();}
            });
            t2.start();
            t1.join();
            t2.join();

        }catch (Exception e){
            e.printStackTrace();
            fail("main did not work with valid args");
        }
    }


}