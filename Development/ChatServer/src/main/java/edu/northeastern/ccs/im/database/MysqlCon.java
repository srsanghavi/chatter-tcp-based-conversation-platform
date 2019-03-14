package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

    /**
     * Get sql result
     *
     * @return the JDBC ResultTest
     */

    public List<Map<String, Object>> sqlGet(String query) throws SQLException {
            Statement stmt = null;
            try {
                stmt = con.createStatement();
                ResultSet rs = stmt.executeQuery(query);
                List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
                Map<String, Object> row = null;

                ResultSetMetaData metaData = rs.getMetaData();
                Integer columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    row = new HashMap<String, Object>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnName(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }
                return resultList;
            } catch (SQLException e ) {
                ChatLogger.warning(e.toString());
            } finally {
                if (stmt != null) { stmt.close(); }
            }
        return null;
    }

    public int sqlcreate(String query) throws SQLException {
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            int r = stmt.executeUpdate(query);
            return r;
        } catch (SQLException e ) {
            ChatLogger.warning(e.toString());
        } finally {
            if (stmt != null) { stmt.close(); }
        }
        return 0;
    }


    public int getLastInsertedID() {
        String query = "SELECT LAST_INSERT_ID() as id;";
        try {
            List<Map<String, Object>> r = sqlGet(query);
            if(!r.isEmpty()){
                return Integer.valueOf(String.valueOf(r.get(0).get("id")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
