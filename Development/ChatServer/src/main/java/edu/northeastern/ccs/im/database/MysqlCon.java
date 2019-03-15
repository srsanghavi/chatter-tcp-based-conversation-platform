package edu.northeastern.ccs.im.database;

import edu.northeastern.ccs.im.ChatLogger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.File;



/**
 * The type Mysql con.
 */
public class MysqlCon {
    private static MysqlCon mySqlCon = null;
    private Connection con;
    private String hostname;
    private String username;
    private String dbpass;

    /**
     * https://www.tutorialspoint.com/java_xml/java_dom_parse_document.htm
     * Code loosely based on the code in this page to parse XML
     *
     * Reads DB Configuration details from xml
     */
    private void setDBConf(){
        try {
            File dbFile = new File("src/main/java/edu/northeastern/ccs/im/database/db.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dbBuilder = dbFactory.newDocumentBuilder();
            Document dbDoc = dbBuilder.parse(dbFile);

            hostname = dbDoc.getElementsByTagName("host").item(0).getAttributes().getNamedItem("value").getNodeValue();
            username = dbDoc.getElementsByTagName("user").item(0).getAttributes().getNamedItem("value").getNodeValue();
            dbpass = dbDoc.getElementsByTagName("pass").item(0).getAttributes().getNamedItem("value").getNodeValue();

        }catch (Exception e){
            ChatLogger.error(e.getMessage());
        }
    }

    private MysqlCon(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            setDBConf();
            //con = DriverManager.getConnection(
            //        "jdbc:mysql://msd-project.cgxeszufief9.us-east-1.rds.amazonaws.com/messaging", "admin", "shashwat");
            con = DriverManager.getConnection(hostname, username, dbpass);
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

    public List<Map<String, Object>> sqlGet(String query) {
            Statement stmt = null;
            ResultSet rs = null;
            List<Map<String, Object>> resultList = new ArrayList<>();
            Map<String, Object> row = null;

            try {
                stmt = con.createStatement();
                try {
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
                }
                finally {
                    if (rs!= null)
                        rs.close();
                }

            } catch (SQLException e ) {
                ChatLogger.warning(e.toString());
            } finally {
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        ChatLogger.error(e.toString());
                    }
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
    public int sqlcreate(String query) {
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            return stmt.executeUpdate(query);
        } catch (SQLException e ) {
            ChatLogger.warning(e.toString());
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    ChatLogger.error(e.toString());
                }
            }
        }
        return 0;
    }

    public int getLastInsertedID() {
        String query = "SELECT LAST_INSERT_ID() as id;";
        List<Map<String, Object>> r = sqlGet(query);
        if(!r.isEmpty()) {
            return Integer.valueOf(String.valueOf(r.get(0).get("id")));
        }
        return -1;
    }
}
