import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const CONV_CHANGED = 'CONV_CHANGED';

let _conversations;
class ConversationStore extends EventEmitter {
    constructor() {
        super();
 
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.USER_CONVERSATIONS:
                this._setConversations(action.payload);
                break;
            default:
            break;
        }
    }

    _setConversations(conversations){
        _conversations = conversations;
        var self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(CONV_CHANGED);
        }, 0);
    }

    getConversations(){
        return _conversations;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CONV_CHANGED, callback);
    }

     // Removes the listener from the CHANGED event.
     removeChangeListener(callback) {
        this.removeListener(CONV_CHANGED, callback);
    }
}

export default new ConversationStore();