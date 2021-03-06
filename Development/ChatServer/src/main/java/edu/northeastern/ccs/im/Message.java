package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.database.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

/**
 * Each instance of this class represents a single transmission by our IM
 * clients.
 * <p>
 * This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-sa/4.0/. It is based on work
 * originally written by Matthew Hertz and has been adapted for use in a class
 * assignment at Northeastern University.
 *
 * @version 1.3
 */
public class Message {

	/** The string sent when a field is null. */
	private static final String NULL_OUTPUT = "--";

	/** The handle of the message. */
	private MessageType msgType;

	/**
	 * The first argument used in the message. This will be the sender's identifier.
	 */
	private String msgSender;

	/** The second argument used in the message. */
	private String msgText;

	/* Added attributes for having a consistent database*/

  private String messageID;       // ID of the message
  private Timestamp creationTS;   // The TS of message creation
  private int threadId;        // ID of thread to which message belongs

  private static UserModel userModel;
  private static ConversationModel conversationModel;

    /**
     * Create a new message that contains actual IM text. The type of distribution
     * is defined by the handle and we must also set the name of the message sender,
     * message recipient, and the text to send.
     *
     * @param handle  Handle for the type of message being created.
     * @param srcName Name of the individual sending this message
     * @param text    Text of the instant message
     */
    public Message(MessageType handle, String srcName, String text) {
		msgType = handle;
		// Save the properly formatted identifier for the userModel sending the
		// message.
		msgSender = srcName;
		// Save the text of the message.
		msgText = text;

    messageID = UUID.randomUUID().toString();
    this.creationTS = new Timestamp((new Date()).getTime());
		userModel = ModelFactory.getUserModel();
		conversationModel = ModelFactory.getConversationModel();
	}

    /**
     * Create a new message to continue the logout process.
     *
     * @param myName The name of the client that sent the quit message.
     * @return Instance of Message that specifies the process is logging out.
     */
    public static Message makeQuitMessage(String myName) {
		return new Message(MessageType.QUIT, myName, null);
	}

    /**
     * Create a new message broadcasting an announcement to the world.
     *
     * @param myName Name of the sender of this very important missive.
     * @param text   Text of the message that will be sent to all users
     * @return Instance of Message that transmits text to all logged in users.
     */
    public static Message makeBroadcastMessage(String myName, String text) {
		return new Message(MessageType.BROADCAST, myName, text);
	}

    /**
     * Store message in db int.
     *
     * @return the int
     */
    public int storeMessageInDb(){
		int senderID;
		int receiverID;
		String destinationUser = this.getText().split("::")[0];
		String message = this.getText().split("::")[1];

		senderID = userModel.getUserID(this.getName());
		receiverID = userModel.getUserID(destinationUser);

		int conversationID = conversationModel.createConversationForUser(senderID,receiverID);
		int messageThreadId = conversationModel.createThreadForConversation(conversationID);
    this.threadId = messageThreadId;
		return conversationModel.createMessageForThread(messageThreadId,senderID,message,"");
	}

    /**
     * Create a new message stating the name with which the userModel would like to
     * login.
     *
     * @param text Name the userModel wishes to use as their screen name.
     * @return Instance of Message that can be sent to the server to try and login.
     */
    protected static Message makeHelloMessage(String text) {
		return new Message(MessageType.HELLO, null, text);
	}

    /**
     * Given a handle, name and text, return the appropriate message instance or an
     * instance from a subclass of message.
     *
     * @param handle  Handle of the message to be generated.
     * @param srcName Name of the originator of the message (may be null)
     * @param text    Text sent in this message (may be null)
     * @return Instance of Message (or its subclasses) representing the handle,         name, & text.
     */
    protected static Message makeMessage(String handle, String srcName, String text) {
		Message result = null;
		if (handle.compareTo(MessageType.QUIT.toString()) == 0) {
			result = makeQuitMessage(srcName);
		} else if (handle.compareTo(MessageType.HELLO.toString()) == 0) {
			result = makeSimpleLoginMessage(srcName, text);
		} else if (handle.compareTo(MessageType.BROADCAST.toString()) == 0) {
			result = makeBroadcastMessage(srcName, text);
		} else if (handle.compareTo(MessageType.API.toString())==0){
			result = makeApiMessage(srcName,text);
		} else if (handle.compareTo(MessageType.NOTIFICATION.toString())==0){
			result = makeNotificationMessage(srcName,text);
		}
		return result;
	}

    /**
     * Create a new message for the early stages when the userModel logs in without all
     * the special stuff.
     *
     * @param myName   Name of the userModel who has just logged in.
     * @param password the password
     * @return Instance of Message specifying a new friend has just logged in.
     */
    public static Message makeSimpleLoginMessage(String myName, String password) {
		return new Message(MessageType.HELLO, myName, password);
	}

    /**
     * Create a new message for the api response
     *
     * @param myName the my name
     * @param text   the text
     * @return Instance of Message
     */
    public static Message makeApiMessage(String myName, String text){
		return new Message(MessageType.API,myName,text);
	}

    /**
     * Make notification message message.
     *
     * @param myName the my name
     * @param text   the text
     * @return the message
     */
    public static Message makeNotificationMessage(String myName, String text) { return  new Message(MessageType.NOTIFICATION,myName,text);}

    /**
     * Return the name of the sender of this message.
     *
     * @return String specifying the name of the message originator.
     */
    public String getName() {
		return msgSender;
	}

    /**
     * Return the text of this message.
     *
     * @return String equal to the text sent by this message.
     */
    public String getText() {
		return msgText;
	}

    /**
     * Determine if this message is broadcasting text to everyone.
     *
     * @return True if the message is a broadcast message; false otherwise.
     */
    public boolean isBroadcastMessage() {
		return (msgType == MessageType.BROADCAST);
	}

    /**
     * Is api message boolean.
     *
     * @return the boolean
     */
    public boolean isApiMessage() {
		return (msgType == MessageType.API);
	}

    /**
     * Determine if this message is sent by a new client to log-in to the server.
     *
     * @return True if the message is an initialization message; false otherwise
     */
    public boolean isInitialization() {
		return (msgType == MessageType.HELLO);
	}

    /**
     * Determine if this message is a message signing off from the IM server.
     *
     * @return True if the message is sent when signing off; false otherwise
     */
    public boolean terminate() {
		return (msgType == MessageType.QUIT);
	}

	/**
	 * Representation of this message as a String. This begins with the message
	 * handle and then contains the length (as an integer) and the value of the next
	 * two arguments.
	 * 
	 * @return Representation of this message as a String.
	 */
	@Override
	public String toString() {
		String result = msgType.toString();
		if (msgSender != null) {
			result += " " + msgSender.length() + " " + msgSender;
		} else {
			result += " " + NULL_OUTPUT.length() + " " + NULL_OUTPUT;
		}
		if (msgText != null) {
			result += " " + msgText.length() + " " + msgText;
		} else {
			result += " " + NULL_OUTPUT.length() + " " + NULL_OUTPUT;
		}
		return result;
	}

    /**
     * Getter to return messageID.
     *
     * @return messageID message id
     */
    public String getMessageID() {
    return this.messageID;
  }

    /**
     * Getter to return message sender.
     *
     * @return messageSenderUsername message sender username
     */
    public String getMessageSenderUsername() {
    return this.msgSender;
  }

    /**
     * Getter to return message text.
     *
     * @return messageText message text
     */
    public String getMessageText() {
    return this.msgText;
  }

    /**
     * Getter to return message creation timestamp.
     *
     * @return creation timestamp
     */
    public Timestamp getCreationTS() {
    return this.creationTS;
  }

    /**
     * Getter to return thread ID.
     *
     * @return threadId thread id
     */
    public int getThreadId() {
    return this.threadId;
  }


}
