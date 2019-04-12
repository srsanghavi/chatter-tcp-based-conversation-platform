package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SqliteCon implements DataCon{
    Connection con;
    private SqliteCon sqliteCon = null;

    private void createDatabase(){

        String url = "jdbc:sqlite:test.db";
        System.out.println(url);

        try{
            con = DriverManager.getConnection(url);
            if (con != null) {
                DatabaseMetaData meta = con.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(con);
    }

    private void createTables(){
        String url = "jdbc:sqlite:test.db";

        // SQL statement for creating a new table
        String sql = "CREATE TABLE IF NOT EXISTS users (\n"
                + "	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n"
                + "	username VARCHAR(45) NOT NULL,\n"
                + "	first_name VARCHAR(45) NOT NULL,\n"
                + "	last_name VARCHAR(45) NOT NULL,\n"
                + "	email VARCHAR(45) NOT NULL,\n"
                + " created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n"
                + " last_modify DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n"
                + "	password VARCHAR(50) NOT NULL,\n"
                + " isSearchable TINYINT(4) NOT NULL DEFAULT '1',\n"
                + " deleted TINYINT(4) NULL DEFAULT NULL,\n"
                + " profilePicture VARCHAR(255) NULL DEFAULT 'https://s3.amazonaws.com/cs5500/u/default.png',\n"
                + " preferredLanguage VARCHAR(45) NOT NULL DEFAULT 'English'\n"
                + ");";

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement()) {
            // create a new table
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }


    public SqliteCon(){
        createDatabase();
        createTables();
    }

    /**
     * Get DataCon instance of the Data Connection
     *
     * @return instance of the data connection
     */
    @Override
    public DataCon getInstance() {
        if(sqliteCon==null){
            sqliteCon = new SqliteCon();
        }
        return sqliteCon;
    }

    /**
     * @return the connection
     */
    @Override
    public Connection getRemoteConnection() {
        return con;
    }

    public List<Map<String, Object>> sqlGet(String query, List<String> arguments) {
        ResultSet rs = null;
        PreparedStatement ps = null;
        List<Map<String, Object>> resultList = new ArrayList<>();
        Map<String, Object> row = null;


        try {
            ps = con.prepareStatement(query);
            try {

                for (int i=0; i<arguments.size(); i++) {
                    ps.setString(i + 1, arguments.get(i));
                }
                System.out.println(arguments.toString());
                rs = ps.executeQuery();

                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnName(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }
            }
            finally {
                if (rs!= null)
                    rs.close();
            }

        } catch (SQLException e ) {
            ChatLogger.warning(e.toString());
        } finally {
            try {
                if (ps != null)
                    ps.close();
            } catch (SQLException e) {
                ChatLogger.error(e.toString());
            }
        }
        return resultList;
    }
    /**
     * Create Sql statement
     * @param query the SQL query
     * @return query status
     * @throws SQLException
     */

    public int sqlcreate(String query, List<String> arguments) {
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(query);
            for (int i=0; i<arguments.size(); i++)
                ps.setString(i+1, arguments.get(i));

            return ps.executeUpdate();
        } catch (SQLException e ) {
            ChatLogger.warning(e.toString());

        } finally {
            try {
                if (ps != null)
                    ps.close();
            } catch (SQLException e) {
                ChatLogger.error(e.toString());
            }

        }
        return 0;
    }


    /**
     * Fetch the ID of the last inserted row in the database
     * @return the last inserted ID
     */
    public int getLastInsertedID() {
        String query = "SELECT LAST_INSERT_ROWID() as id;";
        List<Map<String, Object>> r = sqlGet(query, new ArrayList<>());
        if(!r.isEmpty()) {
            return Integer.valueOf(String.valueOf(r.get(0).get("id")));
        }
        return -1;
    }

}
