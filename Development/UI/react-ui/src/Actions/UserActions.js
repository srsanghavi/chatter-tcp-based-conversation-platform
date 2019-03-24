import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class UserActions {
    signin(username,password){
        api.signin(username,password).then(value => {
          Dispatcher.dispatch({
              actionType: ActionTypes.ACCOUNT_SIGN_IN,
              payload:    value,
          });
        });
    }

    getUsers(username){
      console.log("getUsers/");
      api.getUsers(username).then(value => {
        console.log(value);
      });
    }

    getUserByUsername(username){
        api.getUserByUsername(username).then(value => {
            console.log(value)
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_USERNAME,
                payload:    value,
            })
        });
    }

    getUserById(id){
        api.getUserByUsername(id).then(value => {
            console.log(value)
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_ID,
                payload:    value,
            })
        });
    }

}

export default new UserActions();