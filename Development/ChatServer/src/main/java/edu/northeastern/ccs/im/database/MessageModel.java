package edu.northeastern.ccs.im.database;

public class MessageModel {
    /**
     * The Mysql con.
     */
    private DataCon conn;

    /**
     * Instantiates a new UserModel db.
     */
    public MessageModel(DataCon connection){
        conn = connection;
    }

    public int deleteMessage(int id){
        String sql = "UPDATE message SET deleted=true WHERE id='" + id + "';";
        return conn.sqlcreate(sql);
    }
}
