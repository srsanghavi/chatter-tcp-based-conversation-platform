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
      return mysqlCon.sqlGet(sql);
  }

  /**
   * retrieves a list of groups with the given name
   *
   * @param name the name of the group(s) being searched for
   * @return the list of groups with that name
   */
  public List<Map<String, Object>> getGroupsByName(String name){
    String sql = "SELECT * FROM groups where name='"+name+"'";
      return mysqlCon.sqlGet(sql);
  }

  /**
   * retrieves a list of groups with the given id
   *
   * @param id the id of the group(s) being searched for
   * @return the list of groups with that id
   */
  public List<Map<String, Object>> getGroupsById(int id){
    String sql = "SELECT * FROM groups where id='"+id+"'";
      return mysqlCon.sqlGet(sql);
  }

  /**
   * retrieves a all users in the group
   *
   * @param id the id of the group for which users will be returnd
   * @return the list of users in the group
   */
  public List<Map<String, Object>> getUsersInGroups(int id){
    String sql = "SELECT * FROM groups_has_users where Groups_id='"+id+"'";
      return mysqlCon.sqlGet(sql);
  }

    /**
     * Create group int.
     *
     * @param name     the name
     * @param admin_id the admin id
     * @return the int
     */
    public int createGroup(String name, int admin_id){
    String query = "SELECT create_group_with_admin('"+name+"',"+admin_id+") as id;";
        List<Map<String, Object>> r = mysqlCon.sqlGet(query);
        if(!r.isEmpty()){
            return (int) r.get(0).get("id");
        }
        return -1;
  }

    /**
     * Add user to group int.
     *
     * @param group_id the group id
     * @param user_id  the user id
     * @param is_admin the is admin
     * @return the int
     */
//TODO: change create function to the DB store procedure
  public int addUserToGroup(int group_id,int user_id,int is_admin){
      String query = "INSERT INTO groups_has_users(Groups_id,Users_id,is_admin) VALUES ("+group_id+", "+user_id+", "+is_admin+")";
      int r = mysqlCon.sqlcreate(query);
      return r<=0?-1:r;
  }
}
