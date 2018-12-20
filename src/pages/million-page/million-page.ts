import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SharedService } from '../../helpers/scripts/shared-service';

@Component({
	selector: 'million-page',
	templateUrl: 'million-page.html'
})
export class MillionPage {
	constructor(public navCtrl: NavController, public sharedService: SharedService, public viewCtrl: ViewController, public params: NavParams) {
		this.setBackBtnAction();
	}

	moveTo(param) {
		this.navCtrl.push(HomePage, {}, {animate: false});
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}