package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;


public class MysqlConTest {

    /**
     * Test db connection
     * dbname is checked on the successful connection
     */
    @Test
    public void ConnectionSuccessful(){
        MysqlCon sqlSever = new MysqlCon();
        Connection connection = sqlSever.getRemoteConnection("admin","shashwat");
        String dbname="";
        try {
            Statement sql;
            sql = connection.createStatement();
            ResultSet rs = sql.executeQuery("SELECT DATABASE()");
            rs.next();
            dbname = rs.getString(1);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        assertEquals("messaging",dbname);
    }


    /**
     * passing incorrect db credentials
     */
    @Test
    public void ConnectionUnsuccessful(){
        MysqlCon sqlSever = new MysqlCon();
        Connection connection = sqlSever.getRemoteConnection("admin","shashwat1");
        String dbname="";
        if(connection==null){
            assertFalse(connection!=null);
        }
    }
}
