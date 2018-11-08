import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutUsPage } from '../about-us/about-us';
import { ScenePage } from '../scene/scene';
import { Http } from '@angular/http';
import { SharedService } from '../../app/shared-service';

@Component({
	selector: 'home',
	templateUrl: 'home.html'
})

export class HomePage {
	constructor(public navCtrl: NavController, public http: Http, public sharedService: SharedService) {}

	ionViewWillEnter() {
		this.http.get('assets/fake_json/story1.json')
		  	.subscribe(response => {
				let data = JSON.parse(response["_body"]);

				this["data"] = data;
			}, xhr => {
				console.log(xhr);
			});
	}

	moveTo(page) {
		if (page === 'aboutUs') {
			this.navCtrl.push(AboutUsPage);
		} else if (page === 'scene') {
			this.sharedService.resetStates();
			this.navCtrl.push(ScenePage, {sceneInfo: this["data"], lastPage: 'HomePage'}, {animate: false});
		}
	}
}