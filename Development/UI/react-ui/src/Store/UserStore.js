import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const CHANGE = 'CHANGE';
const USERS_LIST_CHANGE = "USERS_LIST_CHANGE";

let _user;
let _signin;
let _users = [];
let _newuser;

class UserStore extends EventEmitter {
    constructor() {
        super();
 
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.GET_USERS:
                this._setUsers(action.payload);
                break;
            case ActionTypes.GET_USER_BY_USERNAME:
                this._setUser(action.payload);
                break;
            default:
            break;
        }
    }


    _setUser(user){
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
        if(users){
            _users=users.result;
            let self = this;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(USERS_LIST_CHANGE);
            }, 0);
        }
    }

    _getUsers() {
        return _users
    }

    _clearUsers() {
        _users = undefined
    }


    _setSignin(payload){
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


    _setNewUser(user) {
        _newuser = user;
    }

    _getNewUser() {
        return _newuser;
    }

    _clearNewUser() {
        _newuser = undefined;
    }

    _clearAll() {
        this._clearUser();
        this._clearUsers();
        this._clearSignin();
        this._clearNewUser();
    }


    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

     // Removes the listener from the CHANGED event.
     removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }


    addUserListChangeListener(callback){
        this.on(USERS_LIST_CHANGE,callback);
    }

    removeUserListChangeListener(callback){
        this.removeListener(USERS_LIST_CHANGE,callback);
    }
}

export default new UserStore();