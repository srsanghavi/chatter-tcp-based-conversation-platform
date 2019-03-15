package edu.northeastern.ccs.im.group;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class Group {

  private String id; // UUID
  private String name; // Name of Group
  private Timestamp createdOn; // Creation Timestamp
  private Timestamp modifiedOn; // Last Modified Timestamp
  private int conversationId; // Conversation the group belongs to

  public Group(String name) {
    this.name = name;
    UUID uid = UUID.randomUUID();
    id = uid.toString();

    Date date = new Date();
    createdOn = new Timestamp(date.getTime());
    modifiedOn = new Timestamp(date.getTime());
  }

  /**
   *
   * @return group ID
   */
  public String getId() {
    return id;
  }

  /**
   *
   * @return group name
   */
  public String getName() {
    return name;
  }

  /**
   *
   * @return group creation date
   */
  public Timestamp getCreatedOn() {
    return createdOn;
  }

  /**
   *
   * @return group last modified date
   */
  public Timestamp getModifiedOn() {
    return modifiedOn;
  }

  /**
   *
   * @return conversation id for the group
   */
  public int getConversationId() {
    return conversationId;
  }
}
