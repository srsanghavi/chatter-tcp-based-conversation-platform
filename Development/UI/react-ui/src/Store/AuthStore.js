import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const CHANGE = 'CHANGE';

let _user;


class AuthStore extends EventEmitter {
    constructor() {
        super();
 
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.ACCOUNT_SIGN_IN:
                this._setUser(action.payload);
                break;
            case ActionTypes.MODIFY_USER:
                if(action.payload.username === _user.username) {
                    this._updateUser(action.payload);
                }
                break;
            default:
            break;
        }
    }



    _setUser(users){
        if(users.result.length===0){
            _user = null;
        }
        else{
            let self = this;
            localStorage.setItem("loggedIn",true);
            _user = users.result[0];
            _user.isSearchable = _user.isSearchable==1;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(CHANGE);
            }, 0);
        }
    }

    _updateUser(user){
        if(user){
          
            let self = this;
            let username = _user.username;
            _user = user;
            _user.isSearchable = _user.isSearchable==1;
            _user.user = username;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(CHANGE);
            }, 0);
        }
    }

    _getAuthUser() {
        return _user
    }


    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

     // Removes the listener from the CHANGED event.
     removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }

}

export default new AuthStore();