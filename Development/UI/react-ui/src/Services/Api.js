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
                resolve(gateway.getResult());
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

    registerUser(username, password) {
        let msg = this.messageType.makeApiMessage(username,"registerUser/::POST::{username:"+username+",password:"+password+"}");
        gateway.sendTcp(msg);
        console.log(msg)
        console.log(this.promise)
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
        console.log(msg);
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
}

