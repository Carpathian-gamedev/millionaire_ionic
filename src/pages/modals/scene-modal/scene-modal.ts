import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedService } from '../../../helpers/scripts/shared-service';
import { AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@Component({
	selector: 'scene-modal',
	templateUrl: 'scene-modal.html'
})
export class SceneModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, private storage: Storage, public sharedService: SharedService, public admobFree: AdMobFree) {
		this["level"] = this.params.data.level;
		this["prize"] = this.params.data.level.price;
		this["correct"] = this.params.data.correct;
		this["states"] = this.sharedService.getStates() || {};
		this["sharedService"]["admob"].rewardVideoCB = this.rewardVideoListener.bind(this);
		this["sharedService"]["admob"].closeVideoCB = this.closeVideoListener.bind(this);

		// document.addEventListener('admob.rewardvideo.events.REWARD', () => {
  //   		this["videoStartedLoading"] = false;
  //   		this.viewCtrl.dismiss({action: this["action"]});
	 //    });
	
	 //    document.addEventListener('admob.rewardvideo.events.CLOSE', () => {
		//     this["videoStartedLoading"] = false;
	 //    });

	 //    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {
	 //    	this.viewCtrl.dismiss({action: ''});
	 //      	alert('Failed to load VIDEO');
	 //    });

		this.setBackBtnAction();
	}

	rewardVideoListener() {
		this["videoStartedLoading"] = false;
		this.viewCtrl.dismiss({action: this["action"]});
    }

    closeVideoListener() {
    	this["videoStartedLoading"] = false;
    }

	dismiss(action) {
		if (action === 'takePrize') {
			this.storage.get('records').then((val) => {
				let records = val ? JSON.parse(val) : [];

				records.unshift({date: new Date().getTime(), prize: this["prize"]});

				this.storage.set('records', JSON.stringify(records));
				this.viewCtrl.dismiss({action: action});
			});
		} else if (action === 'watchVideoToContinue') {
			this["action"] = action;
			this["videoStartedLoading"] = true;
			this.showAds(action);

			// var event = new Event('admob.rewardvideo.events.REWARD');

			// document.dispatchEvent(event)
			
		} else {
			this.viewCtrl.dismiss({action: action});
		}
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
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}