package edu.northeastern.ccs.im.message;

import java.util.Date;
import java.sql.Timestamp;
import java.util.UUID;

/**
 * Message class, which will be the smallest module.
 */
public class Message {

  private String messageID;       // ID of the message
  private String messageText;     // Message text
  private String messageSenderID;   // ID of the sender

  private Timestamp creationTS;   // The TS of message creation

  private String threadID;        // ID of thread to which message belongs

  private String conversationID;  // ID of conversation to which message belongs



  //----------Receiver --------//
  /**
   * Constructor to create a message object.
   * @param sender sender of the message
   * @param messageText the body of the message
   * @param threadID the thread to which message belongs
   * @param conversationID the conversation to which the message belongs
   */
  public Message(String sender, String messageText, String threadID, String conversationID){

    messageID = UUID.randomUUID().toString();
    this.messageText = messageText;
    this.messageSenderID = sender;

    this.creationTS = new Timestamp((new Date()).getTime());

    this.threadID = threadID;
    this.conversationID = conversationID;

  }

  /**
   * Getter to return messageID.
   *
   * @return messageID
   */
  public String getMessageID() {
    return this.messageID;
  }

  /**
   * Getter to return message sender.
   * @return messageSenderID
   */
  public String getMessageSenderID(){
    return this.messageSenderID;
  }

  /**
   * Getter to return message text.
   * @return messageText
   */
  public String getMessageText(){
    return this.messageText;
  }

  /**
   * Getter to return message creation timestamp.
   * @return creation timestamp
   */
  public Timestamp getCreationTS(){
    return this.creationTS;
  }

  /**
   * Getter to return thread ID.
   * @return threadID
   */
  public String getThreadID(){
    return this.threadID;
  }

  /**
   * Getter to return conversation ID.
   * @return conversationID
   */
  public String getConversationID(){
    return this.conversationID;
  }

}
