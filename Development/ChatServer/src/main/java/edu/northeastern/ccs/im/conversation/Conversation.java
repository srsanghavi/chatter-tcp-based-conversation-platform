package edu.northeastern.ccs.im.conversation;


import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

/**
 * The type Conversation.
 */
public class Conversation {

  private String id; // UUID
  private Timestamp createdOn; // Creation Timestamp


    /**
     * Instantiates a new Conversation.
     */
    public Conversation() {
    UUID uid = UUID.randomUUID();
    id = uid.toString();

    Date date = new Date();
    createdOn = new Timestamp(date.getTime());
  }


    /**
     * Gets id.
     *
     * @return conversation ID
     */
    public String getId() {
    return id;
  }

    /**
     * Gets created on.
     *
     * @return conversation creation timestamp
     */
    public Timestamp getCreatedOn() {
    return createdOn;
  }
}
