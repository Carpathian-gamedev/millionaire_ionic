import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'million-page',
	templateUrl: 'million-page.html'
})
export class MillionPage {
	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
		
	}

	moveTo(param) {
		this.navCtrl.push(HomePage, {}, {animate: false});
	}
}