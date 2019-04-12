package edu.northeastern.ccs.im;

import edu.northeastern.ccs.im.api.Route;
import edu.northeastern.ccs.im.database.DataCon;
import edu.northeastern.ccs.im.database.ModelFactory;
import edu.northeastern.ccs.im.database.MysqlCon;
import org.junit.jupiter.api.Test;

public class RouteTest {

    int userIdWayne;
    int userIdRashford;
    int userIdOle;


    @Test
    public void testGetConversations(){
        System.out.println(Route.getResponseGet("srsanghavi","getConversations/", "{user_id:1}"));
    }

    @Test
    public void testCreateUserDuplicateUser(){
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{first_name:test;last_name:user;username:testUser;email:test@prattle.com;password:'12345678'}"));
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{last_name:user;username:testUser;email:test@prattle.com;password:'12345678'}"));
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{first_name:test;username:testUser;email:test@prattle.com;password:'12345678'}"));
        System.out.println(Route.getResponsePost("srsanghavi","registerUser/","{first_name:test;last_name:user;email:test@prattle.com;password:'12345678'}"));
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
  public void testBroadcastMessageMissingParameters(){
    ChatLogger.info(Route.getResponsePost("srsanghavi","broadcastMessage/", "{message:'hello world'}"));
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
      ChatLogger.info(Route.getResponseGet("hsbudhia","getThreadsInConversation/","{conversation_id:555}"));
    }

    @Test
    public void testCreateAUser() {
        ChatLogger.info(Route.getResponsePost("srsanghavi", "registerUser/",
                "{first_name:Paul,last_name:Pogba,username:pogba,email:pogba@utd.com,password:123x}"));
    }
    @Test
  public void testCreateAUsers(){
      ChatLogger.info(Route.getResponsePost("waynerooney","registerUser/",
              "{first_name:Wayne,last_name:Rooney,username:waynerooney,email:wrooney@utd.com,password:wayne}"));
      userIdWayne = ModelFactory.getUserModel().getUserID("waynerooney");
      ChatLogger.info(Route.getResponsePost("rashy","registerUser/",
              "{first_name:Marcus,last_name:Rashford,username:rashy,email:rashford@utd.com,password:mr10}"));
      userIdRashford =  ModelFactory.getUserModel().getUserID("rashy");
      ChatLogger.info(Route.getResponsePost("solskjaer","registerUser/",
              "{first_name:Ole,last_name:Solskjaer,username:solskjaer,email:ole@utd.com,password:ole20}"));
        userIdOle =  ModelFactory.getUserModel().getUserID("solskjaer");

    }

    @Test
    public void testCreateUserUserConversation(){
      ChatLogger.info(Route.getResponsePost("waynerooney",
              "addUserUserConversation/","{user_id1:814,user_id2:815}"));
    }

  @Test
  public void testCreateUserUserConversationMissingParameters(){
    ChatLogger.info(Route.getResponsePost("waynerooney",
            "addUserUserConversation/","{user_id1:"+userIdWayne+"}"));

  }

  @Test
  public void testCreateMessageNewThread(){
      ChatLogger.info(Route.getResponsePost("waynerooney","sendMessage/","{sender_id:814,thread_id:-1,message:\"How was the match?\",conversation_id:555}"));
  }

  @Test
  public void testCreateMessageNewThreadMissingParameters(){
    ChatLogger.info(Route.getResponsePost("waynerooney","sendMessage/","{sender_id:568,thread_id:-1,message:\"How was the match?\"}"));
  }

  @Test
  public void testCreateMessageReplyThread(){
    ChatLogger.info(Route.getResponsePost("rashy","sendMessage/","{sender_id:815,thread_id:1618,message:\"Hey Shashwat.\",conversation_id:555}"));
  }

  @Test
  public void testCreateGroup(){
    ChatLogger.info(Route.getResponsePost("solskjaer","createGroup/","{group_name:\"Man Utd\",admin_id:694}"));
  }

  @Test
  public void testCreateGroupMissingParameters(){
    ChatLogger.info(Route.getResponsePost("solskjaer","createGroup/","{group_name:\"Man Utd\"}"));
  }

  @Test
  public void testAddUsersToGroup(){
      ChatLogger.info(Route.getResponsePost("solskjaer","addUserToGroup/","{user_id:568,group_id:242}"));
  }

  @Test
  public void testAddUsersToGroupNotAdmin(){
    ChatLogger.info(Route.getResponsePost("rashy","addUserToGroup/","{user_id:568,group_id:242}"));
  }

  @Test
  public void testAddUsersToGroupMissingParameters(){
    ChatLogger.info(Route.getResponsePost("solskjaer","addUserToGroup/","{user_id:568}"));
  }

  @Test
  public void testUpdateGroupName(){
      ChatLogger.info(Route.getResponsePost("solskjaer","updateGroupName/","{group_name:\"New Man Utd\",group_id:242}"));
  }

  @Test
  public void testUpdateGroupNameMissingParameters(){
    ChatLogger.info(Route.getResponsePost("solskjaer","updateGroupName/","{group_name:\"New Man Utd\"}"));
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
  public void testGetUserByNullUsername() {
      ChatLogger.info(Route.getResponseGet("solskjaer","getUserByUsername/","{userame:rashy}"));
  }



  @Test
  public void testGetUsersInConversation(){
      ChatLogger.info(Route.getResponseGet("rashy","getUsersInConversation/","{conversation_id:429}"));
  }

    @Test
    public void testGetUsersInGroup(){
        ChatLogger.info(Route.getResponseGet("srsanghavi","getGroupUsers/","{group_id:252}"));
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
  public void testCreateThreadConversationMissingParameters(){
    ChatLogger.info(Route.getResponsePost("solskjaer","addThreadToConversation/","{thread_id:1500}"));
  }

  @Test
  public void testDeleteGroup(){

      ChatLogger.info(Route.getResponsePost("solskjaer","deleteGroup/","{group_id:245}"));
  }

  @Test
  public void testDeleteGroupMissingParameters(){
    ChatLogger.info(Route.getResponsePost("solskjaer","deleteGroup/","{}"));
  }

  @Test
  public void testdDeleteMessage(){
      ChatLogger.info(Route.getResponsePost("hsbudhia","deleteMessage/","{message_id:663}"));
  }

  @Test
  public void testAddGroupToGroupNotAdmin(){
      ChatLogger.info(Route.getResponsePost("hsbudhia","addGroupToGroup/","{group_id1:201,group_id2:202}"));
  }

  //TODO
  @Test
  public void testAddGroupToGroupAdmin(){
    ChatLogger.info(Route.getResponsePost("ram","addGroupToGroup/","{group_id1:201,group_id2:202}"));
  }

  @Test
  public void testAddGroupToGroupAdminMissingParameters(){
    ChatLogger.info(Route.getResponsePost("ram","addGroupToGroup/","{group_id1:201}"));
  }

    @Test
    public void testGetGroupsForUser(){
        try{
            ChatLogger.info(Route.getResponseGet("hsbudhia", "getGroups/", "{}"));

        }catch (Exception e){
            ChatLogger.info(e.toString());
        }
    }

    @Test
  public void testModifyUser(){
      ChatLogger.info(Route.getResponsePost("hsbudhia","modifyUser/","{user_id:21,first_name:Himanshu,last_name:Budhia,isSearchable:1, preferredLanguage:English}"));
      ChatLogger.info(Route.getResponsePost("hsbudhia","modifyUser/","{user_id:21,first_name:Himanshu,last_name:Budhia,isSearchable:true}"));
    }

    @Test
    public void testUpdateProfilePicture(){
        ChatLogger.info(Route.getResponsePost("hsbudhia","modifyUser/","{user_id:21, profile_picture:'https://s3.amazonaws.com/cs5500/temp/testUser.png'}"));
    }
}
