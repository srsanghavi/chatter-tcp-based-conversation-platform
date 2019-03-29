import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class MessageActions {

    getMessagesInConversation(username,conversationId) {
        api.getMessagesInConversation(username,conversationId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_MESSAGES_IN_CONVERSATION,
                payload: value,
            })
        });
    }

    getMessagesInThread(username,threadId) {
        api.getMessagesInThread(username,threadId).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_MESSAGES_IN_THREAD,
                payload: value,
            })
        });
    }

}

export default new MessageActions();