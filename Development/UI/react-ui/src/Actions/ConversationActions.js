import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class ConversationActions {

    getConversations(username,userId){
        api.getConversations(username,userId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.USER_CONVERSATIONS,
                payload:    value, 
            })
        });
    }

    createUserUserConversation(username, userId1, userId2) {
        api.createUserUserConversation(username, userId1, userId2).then(value => {
        })
    }




}

export default new ConversationActions();