package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.ApiMessageType;
import edu.northeastern.ccs.im.api.Route;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RouteTest {
    ApiMessageType apiType;
    @BeforeEach
    void setUp(){
         apiType = new ApiMessageType();
    }
    @Test
    public void testGetConversations(){
        System.out.println(Route.getResponseGet("srsanghavi","getConversations/", "{user_id:1}"));
    }

    @Test
    public void testCreateUserDuplicateUser(){
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{first_name:test;last_name:user;username:testUser;email:test@prattle.com;password:'12345678'}"));
    }

    @Test
    public void testGetUserGroups(){
        System.out.println(Route.getResponseGet("srsanghavi","getGroups/","{user_id:1}"));
    }

    @Test
    public void testBroadcastMessage(){
        ChatLogger.info(Route.getResponsePost("srsanghavi","broadcastMessage/", "{message:'hello world';sender_id:8}"));
    }

    @Test
    public void testGetMessagesinConversation(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getMessagesInConversation/", "{conversation_id:205}"));
    }

    @Test
    public void testGetMessagesinThread(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getMessagesInThread/", "{thread_id:562}"));
    }

    @Test
    public void testGetAllGroups(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getAllGroups/", "{user_id:8}"));
    }

    @Test
    public void testDeleteUser(){
        ChatLogger.info(Route.getResponsePost("srsanghavi", "deleteUser/","{user_id:1}"));
    }

    @Test
  public void testGetUserFromGroup(){
      ChatLogger.info(Route.getResponseGet("hsbudhia","getGroupUsers/","{group_id:199}"));
    }

    @Test
  public void testGetThreadInConversation(){
      ChatLogger.info(Route.getResponseGet("hsbudhia","getThreadsInConversation/","{conversation_id:407}"));
    }

    @Test
  public void testCreateAUser(){
      ChatLogger.info(Route.getResponsePost("waynerooney","registerUser/",
              "{first_name:Wayne,last_name:Rooney,username:waynerooney,email:wrooney@utd.com,password:wayne}"));
      ChatLogger.info(Route.getResponsePost("rashy","registerUser/",
              "{first_name:Marcus,last_name:Rashford,username:rashy,email:rashford@utd.com,password:mr10}"));
      ChatLogger.info(Route.getResponsePost("solskjaer","registerUser/",
              "{first_name:Ole,last_name:Solskjaer,username:solskjaer,email:ole@utd.com,password:ole20}"));
    }

    @Test
    public void testCreateUserUserConversation(){
      ChatLogger.info(Route.getResponsePost("waynerooney",
              "addUserUserConversation/","{user_id1:568,user_id2:570}"));
    }

  @Test
  public void testCreateMessageNewThread(){
      ChatLogger.info(Route.getResponsePost("waynerooney","sendMessage/","{sender_id:568,thread_id:-1,message:\"How was the match?\",conversation_id:429}"));
  }

  @Test
  public void testCreateMessageReplyThread(){
    ChatLogger.info(Route.getResponsePost("rashy","sendMessage/","{sender_id:570,thread_id:1194,message:\"Hey Shashwat.\",conversation_id:429}"));
  }

  @Test
  public void testCreateGroup(){
    ChatLogger.info(Route.getResponsePost("solskjaer","createGroup/","{group_name:\"Man Utd\",admin_id:694}"));
  }

  @Test
  public void testAddUsersToGroup(){
      ChatLogger.info(Route.getResponsePost("solskjaer","addUserToGroup/","{user_id:568,group_id:242}"));
  }

  @Test
  public void testUpdateGroupName(){
      ChatLogger.info(Route.getResponsePost("solskjaer","updateGroupName/","{group_name:\"New Man Utd\",group_id:242}"));
  }

  @Test
  public void testGetAllUsers(){
      ChatLogger.info(Route.getResponseGet("solskjaer","getUsers/","{}"));
  }

  @Test
  public void testGetUserByUsername(){
      ChatLogger.info(Route.getResponseGet("solskjaer","getUserByUsername/","{username:rashy}"));
  }

  @Test
  public void testGetUsersInConversation(){
      ChatLogger.info(Route.getResponseGet("rashy","getUsersInConversation/","{conversation_id:429}"));
  }

  @Test
  public void testGetMessageThread(){
      ChatLogger.info(Route.getResponseGet("waynerooney","messageInThread/","{thread_id:1194}"));
  }


  @Test
  public void testExceptionThrown(){
      ChatLogger.info(Route.getResponseGet("rashy","messageInThread/","{}"));
  }

  @Test
  public void testCreateThreadConversation(){
      ChatLogger.info(Route.getResponsePost("solskjaer","addThreadToConversation/","{thread_id:1500,conversation_id:406}"));
  }

  @Test
  public void testDeleteGroup(){
      ChatLogger.info(Route.getResponsePost("solskjaer","deleteGroup/","{group_id:245}"));
  }

  @Test
  public void testdDeleteMessage(){
      ChatLogger.info(Route.getResponsePost("hsbudhia","deleteMessage/","{message_id:663}"));
  }

  @Test
  public void testAddGroupToGroupNotAdmin(){
      ChatLogger.info(Route.getResponsePost("hsbudhia","addGroupToGroup/","{group_id1:201,group_id2:202}"));
  }
}
