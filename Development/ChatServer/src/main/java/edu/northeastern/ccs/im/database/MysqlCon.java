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
            con = DriverManager.getConnection(DBConstants.DB_HOST, DBConstants.DB_USERNAME, DBConstants.DB_PASSWORD);
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
            ResultSet rs = null;
            List<Map<String, Object>> resultList = new ArrayList<>();
            Map<String, Object> row = null;

            try {
                stmt = con.createStatement();
                rs = stmt.executeQuery(query);

                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnName(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }

            } catch (SQLException e ) {
                ChatLogger.warning(e.toString());
            } finally {
                if (stmt != null) { stmt.close(); }
                if (rs != null){ rs.close();}
            }
        return resultList;
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

}
