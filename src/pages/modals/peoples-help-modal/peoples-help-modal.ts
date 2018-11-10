import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'peoples-help-modal',
	templateUrl: 'peoples-help-modal.html'
})
export class PeoplesHelpModal {
	constructor(public viewCtrl: ViewController, public params: NavParams) {
		
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}
}