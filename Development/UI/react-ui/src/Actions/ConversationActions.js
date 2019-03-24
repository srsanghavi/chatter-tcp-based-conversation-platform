import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class ConversationActions {

    getConversations(username,userId){
        api.getConversations(username,userId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.USER_CONVERSATIONS,
                payload:    value, 
            })
        });
    }

    signin(username,password){
        console.log("signup");
        api.signin(username,password).then(value => {
          Dispatcher.dispatch({
              actionType: ActionTypes.ACCOUNT_SIGN_IN,
              payload:    value,
          })
        });         
    }

    getUsers(username){
      console.log("getUsers/");
      api.getUsers(username).then(value => {
        console.log(value);
      });
    }

}

export default new ConversationActions();