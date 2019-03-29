package edu.northeastern.ccs.im.api;

public final class ApiMessageType {
    static final String GET_USERS =              "getUsers/";
    static final String CREATE_USER =            "registerUser/";
    static final String MODIFY_USER =            "";
    static final String DELETE_USER =            "deleteUser/";
    static final String GET_USER_CONVERSATION =  "getConversations/";
    static final String GET_USER_GROUP =         "getGroups/";
    static final String GET_USER_BY_USERNAME =   "getUserByUsername/";

    static final String GET_GROUPS =             "getAllGroups/";
    static final String GET_GROUP_USERS =        "getGroupUsers/";
    static final String CREATE_GROUP =           "createGroup/";
    static final String ADD_ADMIN_GROUP =        "";
    static final String MODIFY_GROUP_NAME =      "updateGroupName/";
    static final String ADD_USER_GROUP  =        "addUserToGroup/";
    static final String ADD_GROUP_GROUP =        "addGroupToGroup/";
    static final String GET_GROUP_CONVERSATION = "";
    static final String DELETE_GROUP =           "deleteGroup/";

    static final String CREATE_USER_USER_CONV =  "addUserUserConversation/";
    static final String CREATE_GROUP_CONV =      "";
    static final String GET_THREAD_CONV =        "getThreadsInConversation/";
    static final String ADD_MESSAGE_THREAD =     "addMessageToThread/";
    static final String CREATE_THREAD_CONV =     "addThreadToConversation/";
    static final String GET_MESSAGE_THREAD =     "messageInThread/";
    static final String MODIFY_MESSAGE =         "";
    static final String DELETE_MESSAGE =         "deleteMessage/";
    static final String GET_CONV_USER =          "getUsersInConversation/";
    static final String GET_MSG_CONV =           "getMessagesInConversation/";

    static final String CREATE_MESSAGE =        "sendMessage/";
    static final String BROADCAST_MESSAGE =     "broadcastMessage/";
}
