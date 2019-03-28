package edu.northeastern.ccs.im.database;

public class MessageModel {
    /**
     * The Mysql con.
     */
    private static MysqlCon mysqlCon;
    private static DataCon conn;

    /**
     * Instantiates a new UserModel db.
     */
    public MessageModel(DataCon connection){
        conn = connection.getInstance();
    }

    public int deleteMessage(int id){
        String sql = "UPDATE message SET deleted=true WHERE id='" + id + "';";
        return mysqlCon.sqlcreate(sql);
    }
}
