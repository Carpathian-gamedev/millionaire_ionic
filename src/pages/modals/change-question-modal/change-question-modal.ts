import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@Component({
	selector: 'change-question-modal',
	templateUrl: 'change-question-modal.html'
})
export class ChangeQuestionModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public admobFree: AdMobFree) {
	    document.removeEventListener('admob.rewardvideo.events.REWARD', () => {});
	    document.addEventListener('admob.rewardvideo.events.REWARD', () => {
	    	this["userRewarded"] = true;
	    	this.viewCtrl.dismiss({action: this["action"]});
	      	alert("GIVE USER A REWARD HERE");
	    });

	    document.removeEventListener('admob.rewardvideo.events.CLOSE', () => {});
	    document.addEventListener('admob.rewardvideo.events.CLOSE', () => {
	      	if (!this["userRewarded"]) {
	      		alert('USER CLOSED VIDEO');
	      	}
	    });

	    document.removeEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {});
	    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {
	      	alert('Failed to load VIDEO');
	    });
	}

	dismiss(action) {
		this["videoStartedLoading"] = true;
		this["action"] = action;
		this.showAds(action);
	}

	showAds(action) {
		const videoConfig: AdMobFreeRewardVideoConfig = {
			// add your config here
			// for the sake of this example we will just use the test config
			// id: 'ca-app-pub-7084542198195077/5255813497',
			isTesting: true,
			autoShow: true
		};

		this.admobFree.rewardVideo.config(videoConfig);
		this.admobFree.rewardVideo.prepare()
			.then((response) => {
				// alert(response);
				// alert(JSON.stringify(response));
				// banner Ad is ready
				// if we set autoShow to false, then we will need to call the show method here
				// this.setSceneData(this.navParams.data.sceneInfo, this["questionIndex"]);
			})
			.catch(e => alert(e));

		// if (this.admobFree.rewardVideo.isReady()) {
		// 	this.admobFree.rewardVideo.show().then(() => {
				
		// 	})
		// }
	}
}