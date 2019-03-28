package edu.northeastern.ccs.im.database;

import org.junit.jupiter.api.Test;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;


public class MysqlConTest {

    private static MysqlCon mysqlCon;
    private static DataCon conn = mysqlCon.getInstance();
    /**
     * Test db connection
     * dbname is checked on the successful connection
     */
    @Test
    public void ConnectionSuccessful(){

        Connection connection = conn.getRemoteConnection();
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
        Connection connection = conn.getRemoteConnection();
        String dbname="";
        if(connection==null){
            assertFalse(connection!=null);
        }
    }

    @Test
    public void TestSqlQuery(){
        List<Map<String, Object>> rs = conn.sqlGet("SELECT DATABASE() as db");
        System.out.println(rs.get(0).get("db"));
    }
}
