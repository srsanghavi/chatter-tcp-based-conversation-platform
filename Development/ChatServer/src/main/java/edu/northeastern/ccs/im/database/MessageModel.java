package edu.northeastern.ccs.im.database;

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
        String sql = "UPDATE message SET deleted=true WHERE id='" + id + "';";
        return conn.sqlcreate(sql);
    }
}
