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

    getUserByUsername(username1, username2){
        api.getUserByUsername(username1, username2).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_USERNAME,
                payload:    value,
            })
        });
    }

    getUserById(id) {
        api.getUserById(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER_BY_ID,
                payload:    value,
            })
        });
    }

    modifyUser(username, firstName, lastName, isSearchable) {
        api.modifyUser(username, firstName, lastName, isSearchable).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.MODIFY_USER,
                payload:    value,
            })
        });
    }

    registerUser(sender, username, password, firstName, lastName, email) {
        api.registerUser(sender, username, password, firstName, lastName, email).then(value => {
        })
    }

    deleteUser(username, userId) {
        api.deleteUser(username, userId).then(value => {
        })
    }

    updateUser(username,userId,firstName,lastName,isSearchable,profilePicture){
        console.log(profilePicture);
        api.updateProfile(username,userId,firstName,lastName,isSearchable,profilePicture).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.UPDATE_USER,
                payload: value,
            })
        })
    }

}

export default new UserActions();