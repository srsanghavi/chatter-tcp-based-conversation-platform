package edu.northeastern.ccs.im.database;


import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import edu.northeastern.ccs.im.ChatLogger;

public class GroupDB {

  MysqlCon mysqlCon;

  GroupDB() {
    mysqlCon = MysqlCon.getInstance();
  }

  /**
   * Get groups list
   *
   * @return the list of groups
   */
  public List<Map<String, Object>> getGroups(){
    String sql = "SELECT * FROM groups";
    try {
      return mysqlCon.sqlGet(sql);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }

  /**
   * retrieves a list of groups with the given name
   *
   * @param name the name of the group(s) being searched for
   * @return the list of groups with that name
   */
  public List<Map<String, Object>> getGroupsByName(String name){
    String sql = "SELECT * FROM users where name='"+name+"'";
    try {
      return mysqlCon.sqlGet(sql);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return Collections.emptyList();
  }

  /**
   * retrieves a list of groups with the given id
   *
   * @param id the id of the group(s) being searched for
   * @return the list of groups with that id
   */
  public List<Map<String, Object>> getGroupsById(String id){
    String sql = "SELECT * FROM users where id='"+id+"'";
    try {
      return mysqlCon.sqlGet(sql);
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return Collections.emptyList();
  }
}
