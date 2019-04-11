import Gateway from "./Gateway";
import MessageType from "./MessageType";

const gateway = new Gateway();

export default class Api {

    constructor(){
        this.messageType = new MessageType();
    }

    promise() {
        let promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                var result = gateway.getResult();
                if(result){
                    resolve(JSON.parse(result));
                }
            }, 1000);
        });
        return promise;
    }

    signin(username,password){
        let msg = this.messageType.makeLoginMsg(username,password);
        gateway.sendTcp(msg);
        return this.promise();
    }

    signout(){
        let msg = this.messageType.makeTerminateMessage();
        gateway.sendTcp(msg);
    }

    registerUser(sender, username, password, first_name, last_name, email) {
        let msg = this.messageType.makeApiMessage(sender,"registerUser/::POST::{username:"+username+"," +
            "password:"+password+",first_name:"+first_name+",last_name:"+last_name+",email:"+email+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    deleteUser(username, userId) {
        let msg = this.messageType.makeApiMessage(username,"deleteUser/::POST::{user_id:"+userId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getUsers(username){
        let msg = this.messageType.makeApiMessage(username,"getUsers/::GET::{}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getUserByUsername(username){
        let msg = this.messageType.makeApiMessage(username,"getUserByUsername/::GET::{username:"+username+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getConversations(username,userId){
        let msg = this.messageType.makeApiMessage(username,"getConversations/::GET::{user_id:"+userId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getThreadsInConversation(username,conversationId) {
        let msg = this.messageType.makeApiMessage(username,"getThreadsInConversation/::GET::{conversation_id:"+conversationId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getMessagesInConversation(username,conversationId) {
        let msg = this.messageType.makeApiMessage(username,"getMessagesInConversation/::GET::{conversation_id:"+conversationId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getMessagesInThread(username,threadId) {
        let msg = this.messageType.makeApiMessage(username,"messageInThread/::GET::{thread_id:"+threadId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getGroups(username,userId) {
        let msg = this.messageType.makeApiMessage(username,"getGroups/::GET::{user_id:"+userId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getAllGroups(username) {
        let msg = this.messageType.makeApiMessage(username,"getAllGroups/::GET::{}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    createMessageForThread(username, userId, threadId, messageText, conversationId) {
        let msg = this.messageType.makeApiMessage(username,"sendMessage/::POST::{" +
            "sender_id:"+userId+",thread_id:"+threadId+",message:\""+messageText+"\",conversation_id:"+conversationId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    broadcastMessage(username, userId, message) {
        let msg = this.messageType.makeApiMessage(username,"broadcastMessage/::POST::{" +
            "sender_id:"+userId+",message:"+message+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getGroupUsers(username, groupId) {
        let msg = this.messageType.makeApiMessage(username,"getGroupUsers/::GET::{group_id:"+groupId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    createUserUserConversation(username, userId1, userId2) {
        let msg = this.messageType.makeApiMessage(username,"addUserUserConversation/::POST::{" +
            "user_id1:"+userId1+",user_id2:"+userId2+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    addUserToGroup(username, userId, groupId) {
        let msg = this.messageType.makeApiMessage(username,"addUserToGroup/::POST::{" +
            "user_id:"+userId+",group_id:"+groupId+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    updateProfile(username,userId,firstName,lastName,isSearchable,profilePicture){
        let msg = this.messageType.makeApiMessage(username,"modifyUser/::POST::{" +
        "user_id:"+userId+",first_name:"+firstName+",last_name:"+lastName+",isSearchable:"+isSearchable+",profilePicture:'"+profilePicture+"'}");
        gateway.sendTcp(msg);
        return this.promise();
    }

    getGroupConversations(username,userid){
        let msg = this.messageType.makeApiMessage(username,"getGroupConversation/::GET::{user_id:"+userid+"}");
        gateway.sendTcp(msg);
        return this.promise();
    }
}

