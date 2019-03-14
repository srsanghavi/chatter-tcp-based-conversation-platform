package edu.northeastern.ccs.im.conversation;


import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class Conversation {

  private String id; // UUID
  private Timestamp created_on; // Creation Timestamp


  public Conversation() {
    UUID uid = UUID.randomUUID();
    id = uid.toString();

    Date date = new Date();
    created_on = new Timestamp(date.getTime());
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
  public Timestamp getCreated_on() {
    return created_on;
  }
}
