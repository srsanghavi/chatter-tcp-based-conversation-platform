package edu.northeastern.ccs.im.conversation;


import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class Conversation {

  private String id; // UUID
  private Timestamp createdOn; // Creation Timestamp


  public Conversation() {
    UUID uid = UUID.randomUUID();
    id = uid.toString();

    Date date = new Date();
    createdOn = new Timestamp(date.getTime());
  }


  /**
   *
   * @return conversation ID
   */
  public String getId() {
    return id;
  }

  /**
   *
   * @return conversation creation timestamp
   */
  public Timestamp getCreatedOn() {
    return createdOn;
  }
}
