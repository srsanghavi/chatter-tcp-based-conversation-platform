package edu.northeastern.ccs.im.database;

import java.util.List;
import java.util.Map;
import java.sql.*;

public interface DataCon {

    /**
     * Get DataCon instance of the Data Connection
     * @return instance of the data connection
     */
    DataCon getInstance();

    /**
     * @return the connection
     */
    Connection getRemoteConnection();

    /**
     * Get with a SQL query
     * @param query in string
     * @return List of Rows from database
     */
    List<Map<String, Object>> sqlGet(String query);

    /**
     * Create entries in database
     * @param query in String
     * @return success code
     */
    int sqlcreate(String query);

    /**
     * Get Last Inserted ID
     * @return the last inserted ID for this connection
     */
    int getLastInsertedID();

}
