import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { SharedService } from '../../../helpers/scripts/shared-service';

@Component({
	selector: 'change-question-modal',
	templateUrl: 'change-question-modal.html'
})
export class ChangeQuestionModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public admobFree: AdMobFree, public sharedService: SharedService) {
		this.setBackBtnAction();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}