import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class UserActions {
    signin(username,password){
        console.log("signup");
        api.signin(username,password).then(function(value) {
          Dispatcher.dispatch({
              actionType: ActionTypes.ACCOUNT_SIGN_IN,
              payload:    value,
          })
        });         
    }

    getUsers(username){
      console.log("getUsers/");
      api.getUsers(username).then(function(value) {
        console.log(value);
      });
    }

}

export default new UserActions();