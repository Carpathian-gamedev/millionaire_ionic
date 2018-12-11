import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
	selector: 'change-question-modal',
	templateUrl: 'change-question-modal.html'
})
export class ChangeQuestionModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public admobFree: AdMobFree) {
		
	}

	dismiss(action) {
		this.showAds(action);
	}

	showAds(action) {
		const bannerConfig: AdMobFreeBannerConfig = {
			// add your config here
			// for the sake of this example we will just use the test config
			id: 'ca-app-pub-7084542198195077/6884945150',
			isTesting: true,
			autoShow: true
		};

		this.admobFree.rewardVideo.config(bannerConfig);
		this.admobFree.rewardVideo.prepare()
			.then((response) => {
				alert(response);
				alert(JSON.stringify(response));
				// banner Ad is ready
				// if we set autoShow to false, then we will need to call the show method here
				// this.setSceneData(this.navParams.data.sceneInfo, this["questionIndex"]);
				this.admobFree.rewardVideo.show();
				// this.viewCtrl.dismiss({action: action});
			})
			.catch(e => alert(e));
	}
}