import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class GroupActions {

    getGroups(username,userId) {
        api.getGroups(username,userId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GROUPS,
                payload: value,
            })
        });
    }

    getAllGroups(username) {
        api.getAllGroups(username).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_ALL_GROUPS,
                payload: value,
            })
        });
    }

    getGroupUsers(username, groupId) {
        api.getGroupUsers(username, groupId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GROUP_USERS,
                payload: value,
            })
        })
    }

    addUserToGroup(username, userId, groupId, name) {
        api.addUserToGroup(username, userId, groupId).then(value => {
            if(value.result === "OK") {
                alert("Added " + name + " to group")
            } else {
                alert("Could not add " + name + " to the group")
            }
        })
    }

    addGroupToGroup(username, id1, id2, name) {
        api.addGroupToGroup(username, id1, id2).then(value => {
            if(value.result === "OK") {
                alert("Added " + name + " to group")
            } else {
                alert("Could not add " + name + " to the group")
            }
        })
    }

    getGroupConversations(username,userid){
        api.getGroupConversations(username,userid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GROUP_CONVERSATIONS,
                payload: value,
            })
        })
    }

    createGroup(username, groupName, adminId) {
        api.createGroup(username, groupName, adminId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CREATE_GROUP,
                payload: value,
            })
        })
    }

    updateGroupName(username, groupName, groupId) {
        api.updateGroupName(username, groupName, groupId).then(value => {
            if(value.result === "OK") {
                alert("Changed group name to " + groupName)
            } else {
                alert("Could not change group name")
            }
        })
    }


}

export default new GroupActions();