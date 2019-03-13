package edu.northeastern.ccs.im.thread;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Timestamp;
import java.util.UUID;


/**
 * Thread class that represents a collection of messages and is part of a conversation.
 */
public class Thread {

  private String threadID;        // ID of the thread
  private Timestamp creationTS;   // The TS of thread creation
  private Timestamp modifiedTS;   // The TS of thread modification
  private boolean active;         // Active status of the thread

  private String conversationID;  // ID of conversation to which thread belongs
  private ArrayList<String> messageID;  // List of messages in the thread


  /**
   * Constructor to initialize a thread.
   */
  public Thread(String messageID, String conversationID){
    this.threadID = UUID.randomUUID().toString();     // Give a new ID for thread
    this.creationTS = new Timestamp((new Date()).getTime());  // Initialize the creation timestamp
    this.modifiedTS = new Timestamp((new Date()).getTime());  // Initialize the modified timestamp
    this.messageID = new ArrayList<>();        // Initialize the message list
    active = true;                        // Initialize the active status of thread
    this.conversationID = conversationID; // Update conversation ID of the thread
  }

  /**
   * Method to add messages in the thread.
   * @param messageID new message ID
   */
  public void addMessageToThread(String messageID){

    this.messageID.add(messageID);      // Add the new message to the thread list of messages
    this.modifiedTS = new Timestamp((new Date()).getTime());  // Update modified timestamp

  }

}
