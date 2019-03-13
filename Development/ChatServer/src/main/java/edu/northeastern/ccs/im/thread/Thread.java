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

  
}
