import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedService } from '../../helpers/scripts/shared-service';

@Component({
	selector: 'about-us',
	templateUrl: 'about-us.html'
})
export class AboutUsPage {
	constructor(public navCtrl: NavController, public sharedService: SharedService) {
		this.setBackBtnAction();
	}

	goBack() {
		this.navCtrl.pop();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = this.goBack.bind(this);
	}
}
