import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const THREAD_CHANGED = 'THREAD_CHANGED';

let _threads;
class ThreadStore extends EventEmitter {
    constructor() {
        super();

        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {

            case ActionTypes.GET_THREADS_IN_CONVERSATION:
                this._setThreads(action.payload);
                break;
            default:
                break;
        }
    }

    _setThreads(threads){
        _threads = threads;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(THREAD_CHANGED);
        }, 0);
    }

    _getThreads() {
        return _threads;
    }

    _clearThreads() {
        _threads = undefined;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(THREAD_CHANGED, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(THREAD_CHANGED, callback);
    }
}

export default new ThreadStore();