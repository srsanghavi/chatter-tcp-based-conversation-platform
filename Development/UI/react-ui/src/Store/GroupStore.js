import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const GROUP_CHANGED = 'GROUP_CHANGED';

let _groups;
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
            default:
                break;
        }
    }

    _setGroups(threads){
        _groups = threads;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(GROUP_CHANGED);
        }, 0);
    }

    _getGroups() {
        return _groups;
    }

    _clearGroups() {
        _groups = undefined;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(GROUP_CHANGED, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(GROUP_CHANGED, callback);
    }
}

export default new GroupStore();