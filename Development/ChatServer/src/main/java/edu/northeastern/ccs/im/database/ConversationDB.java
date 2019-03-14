package edu.northeastern.ccs.im.database;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by johngoodacre on 3/14/19.
 */
public class ConversationDB {

  MysqlCon mysqlCon;

  ConversationDB() {
    mysqlCon = MysqlCon.getInstance();
  }

  /**
   * Get conversations list
   *
   * @return the list of conversations
   */
  public List<Map<String, Object>> getConversations(){
    String sql = "SELECT * FROM conversations";
    try {
      return mysqlCon.sqlGet(sql);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }

  /**
   * retrieves a list of conversations with the given id
   *
   * @param id the id of the conversation(s) being searched for
   * @return the list of conversations with that id
   */
  public List<Map<String, Object>> getConversationssById(String id){
    String sql = "SELECT * FROM conversations where id='"+id+"'";
    try {
      return mysqlCon.sqlGet(sql);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return Collections.emptyList();
  }
}
