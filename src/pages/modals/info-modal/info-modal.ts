import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedService } from '../../../helpers/scripts/shared-service';

@Component({
	selector: 'info-modal',
	templateUrl: 'info-modal.html'
})
export class InfoModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public sharedService: SharedService) {
		this["levels"] = this.params.data.levels.slice();
		this["levels"].reverse();
		this["level"] = this.params.data.level;

		this.setBackBtnAction();
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}