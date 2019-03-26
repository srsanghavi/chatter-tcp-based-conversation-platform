package edu.northeastern.ccs.im.database;

import java.util.List;
import java.util.Map;


public class GroupDB {

  private static MysqlCon mysqlCon;

  public GroupDB() {
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
     * @param adminId the admin id
     * @return the int
     */
    public int createGroup(String name, int adminId){
    String query = "SELECT create_group_with_admin('"+name+"',"+adminId+") as id;";
        List<Map<String, Object>> r = mysqlCon.sqlGet(query);
        if(!r.isEmpty()){
            return (int) r.get(0).get("id");
        }
        return -1;
  }

    /**
     * Add user to group int.
     *
     * @param groupId the group id
     * @param userId  the user id
     * @param isAdmin the is admin
     * @return the int
     */
  public int addUserToGroup(int groupId,int userId,int isAdmin){
      String query = "INSERT INTO groups_has_users(Groups_id,Users_id,is_admin) VALUES ("+groupId+", "+userId+", "+isAdmin+")";
      int r = mysqlCon.sqlcreate(query);
      return r<=0?-1:r;
  }

  public int updateGroupName(int groupId, String name){
      String query = "UPDATE groups SET name ='" + name  + "' WHERE id='" + groupId + "';";
      int r = mysqlCon.sqlcreate(query);
      return r<=0?-1:r;
  }

    /**
     * Gets users.
     *
     * @param group_id the value of
     * @return the users
     */
    public static List<Map<String, Object>> getUsers(Integer group_id) {
        String query = "SELECT * FROM users WHERE id in (SELECT users_id FROM groups_has_users WHERE groups_id="+group_id;
        List<Map<String, Object>> r = mysqlCon.sqlGet(query);
        return r;
  }
}
