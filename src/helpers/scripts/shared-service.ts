import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public states;

    constructor() {
        this["states"] = {};
        this["admobListeners"] = {};
        this["letters"] = ['A', 'B', 'C', 'D'];
        this.resetStates();
    }

    resetStates() {
        this.states = {
            fiftyFifty: false,
            peoplesHelp: false,
            changeQuestion: false,
            forgetWrongAnswer: false
        }
    }

    getState(value) {
        return this["states"][value];
    }

    getStates() {
        return this["states"];
    }

    setState(state, value) {
        this["states"][state] = value;
    }

    getLetters() {
        return this["letters"];
    }
}