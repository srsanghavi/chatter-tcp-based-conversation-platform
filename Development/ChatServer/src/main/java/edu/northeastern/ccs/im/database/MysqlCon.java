package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.sql.*;


/**
 * The type Mysql con.
 */
public class MysqlCon {
    private static MysqlCon mySqlCon = null;
    private Connection con;

    private MysqlCon(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(
                    "jdbc:mysql://msd-project.cgxeszufief9.us-east-1.rds.amazonaws.com/messaging", "admin", "shashwat");
        } catch (Exception e) {
            ChatLogger.error("Could not connect to the database -- "+e.toString());
        }
    }

    /**
     * Get instance of mysql connection.
     *
     * Follows Singleton pattern.
     * Creating connection everytime we require the DB access slows down the performance.
     *
     * @return the mysql con
     */
    public static MysqlCon getInstance(){
        if(mySqlCon==null){
            mySqlCon = new MysqlCon();
        }
        return mySqlCon;
    }

    /**
     * Gets remote connection.
     *
     * @return the remote connection
     */
    public Connection getRemoteConnection() {
        return con;
    }
}
