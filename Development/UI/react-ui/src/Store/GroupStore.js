import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const GROUP_CHANGED = 'GROUP_CHANGED';
const GROUPS_CHANGED = "GROUPS_CHANGED";
const GROUP_MEMBERS_CHANGED = "GROUP_MEMBERS_CHANGED";
const NEW_GROUP_CHANGED = "NEW_GROUP_CHANGED";
let _userGroups = [];
let _allGroups = [];
let _groupMembers = [];
let _newGroup = {};

class GroupStore extends EventEmitter {
    constructor() {
        super();

        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {

            case ActionTypes.GET_GROUPS:
                this._setGroups(action.payload);
                break;
            case ActionTypes.GET_ALL_GROUPS:
                this._setAllGroups(action.payload);
                break;
            case ActionTypes.GET_GROUP_USERS:
                this._setGroupMembers(action.payload);
                break;
            case ActionTypes.GET_GROUP_CONVERSATIONS:
                this._setGroups(action.payload);
                break;
            case ActionTypes.CREATE_GROUP:
                this._setNewGroup(action.payload);
                break;
            default:
                break;
        }
    }

    _setGroups(groups){
        _userGroups = groups.result;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(GROUPS_CHANGED);
        }, 0);
    }

    _getGroups() {
        return _userGroups;
    }

    _clearGroups() {
        _userGroups = undefined;
    }


    _setAllGroups(groups){
        if(groups){
            _allGroups = groups.result;
            let self = this;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(GROUPS_CHANGED);
            }, 0);
        }
    }

    _getAllGroups() {
        return _allGroups;
    }

    _clearAllGroups() {
        _allGroups = undefined;
    }

    _setGroupMembers(users) {
        _groupMembers = users.result;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(GROUP_MEMBERS_CHANGED);
        }, 0);
    }

    _getGroupMembers() {
        return _groupMembers;
    }

    _clearGroupMembers() {
        _groupMembers = [];
    }


    _setNewGroup(group){
        if(group){
            console.log(group);
            _newGroup = group;
            let self = this;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(NEW_GROUP_CHANGED);
            }, 0);
        }
    }

    _getNewGroup() {
        return _newGroup;
    }

    _clearNewGroup() {
        _newGroup = {};
    }


    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(GROUP_CHANGED, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(GROUP_CHANGED, callback);
    }

    addGroupsChangeListener(callback){
        this.on(GROUPS_CHANGED,callback);
    }

    removeGroupsListener(callback){
        this.removeListener(GROUPS_CHANGED,callback);
    }

    addGroupMembersChangeListener(callback) {
        this.on(GROUP_MEMBERS_CHANGED, callback);
    }

    removeGroupMembersChangeListener(callback) {
        this.removeListener(GROUP_MEMBERS_CHANGED, callback);
    }

    addNewGroupChangeListener(callback) {
        this.on(NEW_GROUP_CHANGED, callback);
    }

    removeNewGroupChangeListener(callback) {
        this.removeListener(NEW_GROUP_CHANGED, callback);
    }
}

export default new GroupStore();