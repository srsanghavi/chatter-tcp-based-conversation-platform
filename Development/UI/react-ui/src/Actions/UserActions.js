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
      api.getUsers(username).then(value => {
          Dispatcher.dispatch({
              actionType: ActionTypes.GET_USERS,
              payload:    value,
          })
      });
    }

    getUserByUsername(username){
        api.getUserByUsername(username).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_USERNAME,
                payload:    value,
            })
        });
    }

    getUserById(id) {
        api.getUserByUsername(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_ID,
                payload:    value,
            })
        });
    }

    registerUser(username, password, firstName, lastName, email) {
        api.registerUser(username, password, firstName, lastName, email).then(value => {
            console.log(value)
        })
    }

    deleteUser(username, userId) {
        api.deleteUser(username, userId).then(value => {
            console.log(value)
        })
    }

}

export default new UserActions();