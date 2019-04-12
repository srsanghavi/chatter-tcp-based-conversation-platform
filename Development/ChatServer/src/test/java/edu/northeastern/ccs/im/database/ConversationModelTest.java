package edu.northeastern.ccs.im.database;

import org.junit.AfterClass;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ConversationModelTest {
    private static ConversationModel conversationModel;
    private static int lastCreatedConversation;
    private static int user_id1 = 1;
    private static int user_id2 = 21;

    @BeforeAll
    static void setup(){
        conversationModel = ModelFactory.getInstance().getConversationModel();
        lastCreatedConversation = conversationModel.createConversationForUser(user_id1, user_id2);
    }
    @Test
    public void createConversation(){
        int r = conversationModel.createConversationForUser(1,8);
        assertTrue(r > 0);
        conversationModel.deleteConversationPermanently(r);
    }

    @Test
    public void testCreateThreadAndMessage(){
        int t = conversationModel.createThreadForConversation(lastCreatedConversation);
        assertTrue(t > 0);
        assertTrue(conversationModel.createMessageForThread(t,user_id2,"Hello, testcase from junit - 2.","")>0);
    }

    @Test
    public void testMultipleThreadFromUsers() {
        int t = conversationModel.createThreadForConversation(lastCreatedConversation);
        int e = conversationModel.createThreadForConversation(lastCreatedConversation);
        assertTrue(t > 0);
        assertTrue(e > 0);
    }

    @Test
    public void testGetMessagesInAConversation(){
        int t = conversationModel.createThreadForConversation(lastCreatedConversation);
        assertTrue(conversationModel.createMessageForThread(t,user_id2,"Hello, testcase from junit - 2.","")>0);
        assertTrue(conversationModel.getMessagesForConversation("hsbudhia", lastCreatedConversation).size() > 0);
    }

    @Test
    public void testGetConversations(){
        assertTrue(conversationModel.getConversations().size() > 0);
    }

    @Test
    public void testGetConversationsById(){
        assertTrue(conversationModel.getConversationsById(lastCreatedConversation).size() == 1);
    }

    @Test
    public void testGetThreadsForConversation(){
        assertTrue(conversationModel.getThreadsForConversation(lastCreatedConversation).size() > 0);
    }

    @Test
    public void testUserUserCreateConversationForNoRealUser(){
        assertTrue(conversationModel.createConversationForUser(1,50)<=0);
    }

    @Test
    public void  testGetConversationsForUser(){
        assertTrue(conversationModel.getConversations(1).size() > 0);
    }

    @Test
    public void testAddMessageToThread(){
        assertTrue(conversationModel.addMessageToThread(311,519) <= 0);
    }

    @AfterClass
    static void cleanup(){
        conversationModel.deleteConversationPermanently(lastCreatedConversation);
    }

    @Test
    public void testCreateMessageInEnglish(){
        System.out.println(conversationModel.createMessageForThread(2633,814,"Como estas?",""));
    }

    @Test
    public void testReceivedTranslatedMessageInThread(){
        System.out.println(conversationModel.getMessagesInThread("rashy",2633));
    }

    @Test
    public void testReceivedTranslatedMessageInConversation(){
        System.out.println(conversationModel.getMessagesForConversation("budhiahimanshu96",898));
    }

    @Test
    public void testGetGroupConversation(){
        System.out.println(conversationModel.getGroupConversations(814));
    }
}
