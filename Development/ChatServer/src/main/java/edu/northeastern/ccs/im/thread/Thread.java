package edu.northeastern.ccs.im.thread;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Thread class that represents a collection of messages and is part of a conversation.
 */
public class Thread {

  private int threadID;        // ID of the thread
  private Timestamp creationTS;   // The TS of thread creation
  private Timestamp modifiedTS;   // The TS of thread modification
  private boolean active;         // Active status of the thread

  private String conversationID;  // ID of conversation to which thread belongs
  private ArrayList<String> messageID;  // List of messages in the thread


  /**
   * Constructor to initialize a thread.
   */
  public Thread(String messageID, String conversationID) {
    this.creationTS = new Timestamp((new Date()).getTime());  // Initialize the creation timestamp
    this.modifiedTS = new Timestamp((new Date()).getTime());  // Initialize the modified timestamp
    this.messageID = new ArrayList<>();        // Initialize the message list
    this.messageID.add(messageID);
    active = true;                        // Initialize the active status of thread
    this.conversationID = conversationID; // Update conversation ID of the thread
  }

  /**
   * Method to add messages in the thread.
   *
   * @param messageID new message ID
   */
  public void addMessageToThread(String messageID) {

    this.messageID.add(messageID);      // Add the new message to the thread list of messages
    this.modifiedTS = new Timestamp((new Date()).getTime());  // Update modified timestamp

  }

  /**
   * Getter to return threadID.
   *
   * @return threadID
   */
  public int getThreadID() {
    return this.threadID;
  }

  /**
   * Getter to check active status of thread.
   */
  public boolean isActive() {
    return this.active;
  }

  /**
   * Getter to return conversation ID for this thread.
   */
  public String getConversationID() {
    return this.conversationID;
  }

  /**
   * Getter to return creation timestamp of the thread.
   */
  public Timestamp getCreationTS() {
    return this.creationTS;
  }

  /**
   * Getter to return modified timestamp of the thread.
   */
  public Timestamp getModifiedTS() {
    return this.modifiedTS;
  }

  /**
   * Getter to return the list of messages in the thread.
   */
  public List<String> getMessageID() {
    return this.messageID;
  }

}
