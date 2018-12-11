import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
	selector: 'change-question-modal',
	templateUrl: 'change-question-modal.html'
})
export class ChangeQuestionModal {
	constructor(public viewCtrl: ViewController, public params: NavParams) {
		
	}

	dismiss(action) {
		this.viewCtrl.dismiss({action: action});
	}
}