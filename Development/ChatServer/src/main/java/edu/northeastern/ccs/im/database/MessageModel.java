package edu.northeastern.ccs.im.database;

import java.util.ArrayList;
import java.util.List;

/**
 * The type Message model.
 */
public class MessageModel {
    /**
     * The Mysql con.
     */
    private DataCon conn;

    /**
     * Instantiates a new UserModel db.
     *
     * @param connection the connection
     */
    public MessageModel(DataCon connection){
        conn = connection;
    }

    /**
     * Delete message int.
     *
     * @param id the id
     * @return the int
     */
    public int deleteMessage(int id){
        String sql = "UPDATE message SET deleted=true WHERE id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlcreate(sql, args);
    }
}
