package edu.northeastern.ccs.im.api;

/**
 * The type Api message type.
 */
public final class ApiMessageType {
    /**
     * The Get users.
     */
    static final String GET_USERS =              "getUsers/";
    /**
     * The Create user.
     */
    static final String CREATE_USER =            "registerUser/";
    /**
     * The Modify user.
     */
    static final String MODIFY_USER =            "modifyUser/";
    /**
     * The Delete user.
     */

    static final String DELETE_USER =            "deleteUser/";
    /**
     * The Get user conversation.
     */
    static final String GET_USER_CONVERSATION =  "getConversations/";
    /**
     * The Get user group.
     */
    static final String GET_USER_GROUP =         "getGroups/";
    /**
     * The Get user by username.
     */
    public static final String GET_USER_BY_USERNAME =   "getUserByUsername/";

    /**
     * The Get groups.
     */
    static final String GET_GROUPS =             "getAllGroups/";
    /**
     * The Get group users.
     */
    static final String GET_GROUP_USERS =        "getGroupUsers/";
    /**
     * The Create group.
     */
    static final String CREATE_GROUP =           "createGroup/";
    /**
     * The Add admin group.
     */
    static final String ADD_ADMIN_GROUP =        "addAdminGroup/";
    /**
     * The Modify group name.
     */
    static final String MODIFY_GROUP_NAME =      "updateGroupName/";
    /**
     * The Add user group.
     */
    static final String ADD_USER_GROUP  =        "addUserToGroup/";
    /**
     * The Add group group.
     */
    static final String ADD_GROUP_GROUP =        "addGroupToGroup/";
    /**
     * The Get group conversation.
     */
    static final String GET_GROUP_CONVERSATION = "getGroupConversation/";
    /**
     * The Delete group.
     */
    static final String DELETE_GROUP =           "deleteGroup/";

    /**
     * The Create user user conv.
     */
    static final String CREATE_USER_USER_CONV =  "addUserUserConversation/";
    /**
     * The Create group conv.
     */
    static final String CREATE_GROUP_CONV =      "";
    /**
     * The Get thread conv.
     */
    static final String GET_THREAD_CONV =        "getThreadsInConversation/";
    /**
     * The Add message thread.
     */
    static final String ADD_MESSAGE_THREAD =     "addMessageToThread/";
    /**
     * The Create thread conv.
     */
    static final String CREATE_THREAD_CONV =     "addThreadToConversation/";
    /**
     * The Get message thread.
     */
    static final String GET_MESSAGE_THREAD =     "messageInThread/";
    /**
     * The Modify message.
     */
    static final String MODIFY_MESSAGE =         "";
    /**
     * The Delete message.
     */
    static final String DELETE_MESSAGE =         "deleteMessage/";
    /**
     * The Get conv user.
     */
    static final String GET_CONV_USER =          "getUsersInConversation/";
    /**
     * The Get msg conv.
     */
    static final String GET_MSG_CONV =           "getMessagesInConversation/";

    /**
     * The Create message.
     */
    static final String CREATE_MESSAGE =        "sendMessage/";
    /**
     * The Broadcast message.
     */
    static final String BROADCAST_MESSAGE =     "broadcastMessage/";

    /**
     * The online users.
     */
    static final String ONLINE_USERS =             "onlineUsers/";
}
