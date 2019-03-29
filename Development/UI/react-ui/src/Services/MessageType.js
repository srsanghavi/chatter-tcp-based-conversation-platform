export default class MessageType {
    makeLoginMsg(username,password){
        if(text!="" || text==null){
            text="";
        }
        return 'HLO '+ username.length + ' ' + username + ' ' + password.length + ' ' + password;
    }

    makeTerminateMessage(username){
        if(text!="" || text==null){
            text="";
        }
        return 'BYE ' + username.length + ' ' + username + ' ' + 0 + ' ' + '';
    }

    makeBroadcastMessage(username, text){
        if(text!="" || text==null){
            text="";
        }
        return 'BCT ' + username.length + ' ' + username + ' ' + text.length + ' ' + text;
    }

    makeApiMessage(username, text){
        if(text!="" || text==null){
            text="";
        }
        return 'API ' + username.length + ' ' + username + ' ' + text.length + ' ' + text;
    }
}