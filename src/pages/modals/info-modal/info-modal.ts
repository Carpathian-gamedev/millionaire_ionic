import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedService } from '../../../helpers/scripts/shared-service';

@Component({
	selector: 'info-modal',
	templateUrl: 'info-modal.html'
})
export class InfoModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public sharedService: SharedService) {
		this["levels"] = this.params.data.levels;
		this["level"] = this.params.data.level;
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}
}