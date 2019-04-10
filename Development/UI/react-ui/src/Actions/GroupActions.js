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

    addUserToGroup(username, userId, groupId) {
        api.addUserToGroup(username, userId, groupId).then(value => {
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
}

export default new GroupActions();