import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../AppConstants';

const CHANGE = 'CHANGE';

let _user;
class UserStore extends EventEmitter {
    constructor() {
        super();
 
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.ACCOUNT_SIGN_IN:
                console.log(action);
                this._setUser(action.payload);
                break;
            default:
            break;
        }
    }

    _setUser(user){
        console.log(user);

        if(user !== null) {
            localStorage.setItem('username', user.username)
            localStorage.setItem('id', user.id)
        }

        _user=user;
        let self = this;
        setTimeout(() => { // Run after dispatcher has finished
            self.emit(CHANGE);
        }, 0);
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

     // Removes the listener from the CHANGED event.
     removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new UserStore();