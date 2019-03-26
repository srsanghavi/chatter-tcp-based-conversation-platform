import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';
import Api from '../Services/Api';

const api = new Api();

class ThreadActions {

    // getConversations(username,userId){
    //     api.getConversations(username,userId).then(value => {
    //         console.log(value);
    //         Dispatcher.dispatch({
    //             actionType: ActionTypes.USER_CONVERSATIONS,
    //             payload:    value,
    //         })
    //     });
    // }

    getThreadsInConversation(username,conversationId) {
        api.getThreadsInConversation(username,conversationId).then(value => {
            console.log(value);
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_THREADS_IN_CONVERSATION,
                payload: value,
            })
        });
    }

}

export default new ThreadActions();