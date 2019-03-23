import Gateway from "./Gateway";
import MessageType from "./MessageType";

const gateway = new Gateway();

export default class Api {

    constructor(){
        this.messageType = new MessageType();
    }

    signin(username,password){
        var msg = this.messageType.makeLoginMsg(username,password);
        gateway.sendTcp(msg);

        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(gateway.getResult());
            }, 1000);
          });
        
          return promise;
    }

    signout(){
        var msg = this.messageType.makeTerminateMessage();
        gateway.sendTcp(msg);
    }

    getUsers(username){
        var msg = this.messageType.makeApiMessage(username,"getUsers/::GET::{}");
        gateway.sendTcp(msg);

        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(gateway.getResult());
            }, 1000);
          });
        
          return promise;
    }
}

