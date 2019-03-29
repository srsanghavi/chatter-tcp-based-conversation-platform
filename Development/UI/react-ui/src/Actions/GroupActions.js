import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class GroupActions {

    getGroups(username,userId) {
        api.getGroups(username,userId).then(value => {
            console.log(value)
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_GROUPS,
                payload: value,
            })
        });
    }

    getAllGroups(username) {
        api.getAllGroups(username).then(value => {
            console.log(value)
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_ALL_GROUPS,
                payload: value,
            })
        });
    }

}

export default new GroupActions();