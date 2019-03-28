import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const MESSAGES_CHANGED = 'MESSAGES_CHANGED';

let _messages;
let _threadMessages;

class MessageStore extends EventEmitter {
    constructor() {
        super();

        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {

            case ActionTypes.GET_MESSAGES_IN_CONVERSATION:
                this._setMessages(action.payload);
                break;
            case ActionTypes.GET_MESSAGES_IN_THREAD:
                this._setThreadMessages(action.payload);
                break;
            default:
                break;
        }
    }

    _setMessages(messages){
        _messages = messages;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(MESSAGES_CHANGED);
        }, 0);
    }

    _getMessages() {
        return _messages;
    }

    _clearMessages() {
        _messages = undefined;
    }


    _setThreadMessages(messages){
        _threadMessages = messages;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(MESSAGES_CHANGED);
        }, 0);
    }

    _getThreadMessages() {
        return _threadMessages;
    }

    _clearThreadMessages() {
        _threadMessages = undefined;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(MESSAGES_CHANGED, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(MESSAGES_CHANGED, callback);
    }
}

export default new MessageStore();