import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const CHANGE = 'CHANGE';

let _user;
let _signin;
let _users;
class UserStore extends EventEmitter {
    constructor() {
        super();
 
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.ACCOUNT_SIGN_IN:
                console.log(action);
                this._setSignin(action.payload);
                break;
            case ActionTypes.GET_USERS:
                console.log(action);
                this._setUsers(action.payload);
                break;
            case ActionTypes.GET_USER_BY_USERNAME:
                console.log(action);
                this._setUser(action.payload);
                break;
            default:
            break;
        }
    }


    _setUser(user){
        console.log(user);
        _user=user;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(CHANGE);
        }, 0);
    }

    _getUser() {
        return _user
    }

    _clearUser() {
        _user = undefined
    }


    _setUsers(users){
        console.log(users);
        _users=users;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(CHANGE);
        }, 0);
    }

    _getUsers() {
        return _users
    }

    _clearUsers() {
        _users = undefined
    }


    _setSignin(payload){
        console.log(payload);
        _signin=payload;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(CHANGE);
        }, 0);
    }

    _getSignIn() {
        return _signin
    }

    _clearSignin() {
        _signin = undefined
    }


    _clearAll() {
        _user = undefined;
        _users = undefined;
        _signin = undefined;
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

export default new UserStore();