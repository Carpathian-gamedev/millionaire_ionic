import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'change-question-modal',
	templateUrl: 'change-question-modal.html'
})
export class ChangeQuestionModal {
	constructor(public viewCtrl: ViewController, public params: NavParams) {
		
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}
}