import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    constructor() {
        this.resetStates();
    }

    resetStates() {
        this.states = {
            fiftyFifty: false,
            peopleHelp: false,
            friendHelp: false
        }
    }

    getState(value) {
        return this.states[value];
    }

    getStates() {
        return this.states;
    }

    setState(state, value) {

    }
}