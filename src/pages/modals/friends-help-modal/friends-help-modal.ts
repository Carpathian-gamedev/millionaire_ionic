import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'friends-help-modal',
	templateUrl: 'friends-help-modal.html'
})
export class FriendsHelpModal {
	constructor(public viewCtrl: ViewController, public params: NavParams) {
		
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}
}