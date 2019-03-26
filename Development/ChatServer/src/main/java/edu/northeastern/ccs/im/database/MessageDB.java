package edu.northeastern.ccs.im.database;

public class MessageDB {
    /**
     * The Mysql con.
     */
    private static MysqlCon mysqlCon;

    /**
     * Instantiates a new User db.
     */
    public MessageDB(){
        mysqlCon = MysqlCon.getInstance();
    }

    public int deleteMessage(int id){
        String sql = "UPDATE message SET deleted=true WHERE id='" + id + "';";
        return mysqlCon.sqlcreate(sql);
    }
}
