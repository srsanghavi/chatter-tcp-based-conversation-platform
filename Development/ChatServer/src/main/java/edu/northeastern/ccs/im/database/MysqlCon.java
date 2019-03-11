package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.sql.*;


public class MysqlCon {
    public Connection getRemoteConnection(String username, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con;
            con = DriverManager.getConnection(
                    "jdbc:mysql://msd-project.cgxeszufief9.us-east-1.rds.amazonaws.com/messaging", username, password);
            return con;
        } catch (Exception e) {
            ChatLogger.error("Could not connect to the database -- "+e.toString());
            return null;
        }
    }

}
