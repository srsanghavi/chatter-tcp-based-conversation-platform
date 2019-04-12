package edu.northeastern.ccs.im.database;

import java.util.*;


/**
 * The type Group model.
 */
public class GroupModel {

  private DataCon conn;

  /**
   * Instantiates a new Group model.
   *
   * @param connection the connection
   */
  public GroupModel(DataCon connection) {
      conn = connection.getInstance();
  }

    /**
     * Get groups list
     *
     * @return the list of groups
     */
    public List<Map<String, Object>> getGroups(){
        String sql = "SELECT * FROM groups";
       return conn.sqlGet(sql, new ArrayList<>());
  }

    /**
     * retrieves a list of groups with the given name
     *
     * @param name the name of the group(s) being searched for
     * @return the list of groups with that name
     */
    public List<Map<String, Object>> getGroupsByName(String name){
        String sql = "SELECT * FROM groups where name=?;";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, name);
        return conn.sqlGet(sql, args);
  }

    /**
     * retrieves a list of groups with the given id
     *
     * @param id the id of the group(s) being searched for
     * @return the list of groups with that id
     */
    public List<Map<String, Object>> getGroupsById(int id){
        String sql = "SELECT * FROM groups where id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlGet(sql, args);
  }

    /**
     * retrieves a all users in the group
     *
     * @param id the id of the group for which users will be returnd
     * @return the list of users in the group
     */
    public List<Map<String, Object>> getUsersInGroups(int id){
        String sql = "SELECT * FROM groups_has_users where Groups_id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
      return conn.sqlGet(sql, args);
  }

    /**
     * Create group int.
     *
     * @param name    the name
     * @param adminId the admin id
     * @return the int
     */
    public int createGroup(String name, int adminId){
        String query = "SELECT create_group_with_admin(?, ?) as id;";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, name, Integer.toString(adminId));
        List<Map<String, Object>> r = conn.sqlGet(query, args);
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
        String query = "INSERT INTO groups_has_users(Groups_id,Users_id,is_admin) VALUES (?, ?, ?);";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, Integer.toString(groupId), Integer.toString(userId), Integer.toString(isAdmin));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
  }

    /**
     * Update group name int.
     *
     * @param groupId the group id
     * @param name    the name
     * @return the int
     */
    public int updateGroupName(int groupId, String name){
        String query = "UPDATE groups SET name =? WHERE id=?;";
        List<String> args = new ArrayList<>();
        Collections.addAll(args, name, Integer.toString(groupId));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
  }

    /**
     * Gets users.
     *
     * @param group_id the value of
     * @return the users
     */
    public List<Map<String, Object>> getUsers(Integer group_id) {
        String query = "SELECT * FROM users WHERE id in (SELECT users_id FROM groups_has_users WHERE groups_id=?)";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(group_id));
        return conn.sqlGet(query, args);
  }

  /**
   * Function for adding group to a group.
   *
   * @param id1 new parent group
   * @param id2 the group to add
   * @return success value
   */
// Changing group id from id2 to id1 for all users where it is applicable.
  // Essentially group 2 does not exist.
  // The admin status of group 2 is passed in group 1.
    /**
     * Function for adding group to a group.
     *
     * @param id1 new parent group
     * @param id2 the group to add
     * @return success value
     */
    // All users from group 2 will be added to group 1 while maintaining group 2 separately
  public int addGroupToGroup(int id1, int id2){
      String sql = "Select Users_id from groups_has_users where Groups_id = ?;";
      List<String> args = new ArrayList<>();
      Collections.addAll(args, Integer.toString(id2));
      List<Map<String, Object>> r = conn.sqlGet(sql, args);
      int res = 0;
      for(Map<String,Object> user: r){
        int userId = (int) user.get("Users_id");
        res = addUserToGroup(id1,userId,0);
        if(res<0){
          return -1;
        }
    }
    return res;
  }

  /**
   * Get all groups list.
   *
   * @return the list
   */
  public List<Map<String, Object>> getAllGroups(){
        String query = "SELECT * from groups;";
        return conn.sqlGet(query, new ArrayList<>());
  }

    /**
     * Delete group int.
     *
     * @param id the id
     * @return the int
     */
    public int deleteGroup(int id){
        String sql = "UPDATE groups SET deleted=true WHERE id=?;";
        List<String> args = new ArrayList<>();
        args.add(Integer.toString(id));
        return conn.sqlcreate(sql, args);
  }


    /**
     * Function to retrieve all public groups.
     *
     * @return list of public groups
     */
    public List<Map<String,Object>> getNonPrivateGroups(){
     String sql = "SELECT * from groups WHERE isSearchable='1';";
     return conn.sqlGet(sql, new ArrayList<>());
  }

  // AddGroupToGroup
    /**
     * Delete group record permanently
     * @param id group ID
     * @return Result code
     */
    public int deleteGroupPermanently(int id){
        String query = "DELETE FROM users WHERE id=?";
        List<String> args = new ArrayList<>(Arrays.asList(Integer.toString(id)));
        int r = conn.sqlcreate(query, args);
        return r<=0?-1:r;
    }
}
