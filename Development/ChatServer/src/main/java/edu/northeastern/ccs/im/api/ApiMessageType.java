package edu.northeastern.ccs.im.api;

public final class ApiMessageType {
    final static String GET_USERS =              "getUsers/";
    final static String CREATE_USER =            "registerUser/";
    final static String MODIFY_USER =            "";
    final static String DELETE_USER =            "deleteUser/";
    final static String GET_USER_CONVERSATION =  "getConversations/";
    final static String GET_USER_GROUP =         "getGroups/";
    final static String GET_USER_BY_USERNAME =   "getUserByUsername/";

    final static String GET_GROUPS =             "getAllGroups/";
    final static String GET_GROUP_USERS =        "getGroupUsers/";
    final static String CREATE_GROUP =           "";
    final static String ADD_ADMIN_GROUP =        "";
    final static String MODIFY_GROUP_NAME =      "updateGroupName/";
    final static String ADD_USER_GROUP  =        "addUserToGroup/";
    final static String GET_GROUP_CONVERSATION = "";
    final static String DELETE_GROUP =           "deleteGroup/";

    final static String CREATE_USER_USER_CONV =  "";
    final static String CREATE_GROUP_CONV =      "";
    final static String GET_THREAD_CONV =        "getThreadsInConversation/";
    final static String ADD_MESSAGE_THREAD =     "addMessageToThread/";
    final static String CREATE_THREAD_CONV =     "addThreadToConversation/";
    final static String GET_MESSAGE_THREAD =     "messageInThread/";
    final static String MODIFY_MESSAGE =         "";
    final static String DELETE_MESSAGE =         "deleteMessage/";
    final static String GET_CONV_USER =          "getUsersInConversation/";
    final static String GET_MSG_CONV =           "getMessagesInConversation/";

    final static String CREATE_MESSAGE =        "sendMessage/";
}
