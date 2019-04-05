package edu.northeastern.ccs.im.group;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

/**
 * The type Group.
 */
public class Group {

  private String id; // UUID
  private String name; // Name of Group
  private Timestamp createdOn; // Creation Timestamp
  private Timestamp modifiedOn; // Last Modified Timestamp
  private int conversationId; // Conversation the group belongs to
  private boolean searchable; // Group being private/public with default public

    /**
     * Instantiates a new Group.
     *
     * @param name the name
     */
    public Group(String name) {
    this.name = name;
    UUID uid = UUID.randomUUID();
    id = uid.toString();

    Date date = new Date();
    createdOn = new Timestamp(date.getTime());
    modifiedOn = new Timestamp(date.getTime());
    searchable = true;
  }

    /**
     * Gets id.
     *
     * @return group ID
     */
    public String getId() {
    return id;
  }

    /**
     * Gets name.
     *
     * @return group name
     */
    public String getName() {
    return name;
  }

    /**
     * Gets created on.
     *
     * @return group creation date
     */
    public Timestamp getCreatedOn() {
    return createdOn;
  }

    /**
     * Gets modified on.
     *
     * @return group last modified date
     */
    public Timestamp getModifiedOn() {
    return modifiedOn;
  }

    /**
     * Gets conversation id.
     *
     * @return conversation id for the group
     */
    public int getConversationId() {
    return conversationId;
  }

    /**
     * Make group private.
     */
    public void makeGroupPrivate(){
    this.searchable = false;
  }

    /**
     * Get searchable boolean.
     *
     * @return searchable criteria for group
     */
    public boolean getSearchable(){
    return this.searchable;
  }
}
