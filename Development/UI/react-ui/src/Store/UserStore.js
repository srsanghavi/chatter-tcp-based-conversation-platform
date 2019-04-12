import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import UserActions from '../Actions/UserActions';
import AuthStore from './AuthStore';

const CHANGE = 'CHANGE';
const USERS_LIST_CHANGE = "USERS_LIST_CHANGE";
const ONLINE = "ONLINE";
const NEW_USER_CHANGE = "NEW_USER_CHANGE"

let _user = {};
let _users = [];
let _onlineUsers = [];
let _newuser = {};

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
            case ActionTypes.UPDATE_USER:
                this._updateUser(action.payload);
                break;
            case ActionTypes.ONLINE_USER:
                this._setOnlineUsers(action.payload);
                break;

            default:
            break;
        }
    }

    _updateUser(res){
        if(res){
            UserActions.getUserByUsername(AuthStore._getAuthUser().username);
        }
    }
    _setUser(user){
        if(user){
            _user=user.result[0];
            let self = this;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(CHANGE);
            }, 0);
        }
    }

    _getUser() {
        return _user;
    }

    _clearUser() {
        _user = {}
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



    _setNewUser(user) {
        if(user){
            _newuser=user.result;
            let self = this;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(NEW_USER_CHANGE);
            }, 0);
        }
    }

    _getNewUser() {
        return _newuser;
    }

    _clearNewUser() {
        _newuser = {};
    }

    _clearAll() {
        this._clearUser();
        this._clearUsers();
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