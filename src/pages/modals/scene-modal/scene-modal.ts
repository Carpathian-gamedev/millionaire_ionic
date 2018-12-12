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
			const bannerConfig: AdMobFreeRewardVideoConfig = {
				// add your config here
				// for the sake of this example we will just use the test config
				isTesting: true,
				autoShow: true
			};
			
			this.admobFree.rewardVideo.config(bannerConfig);
			this.admobFree.rewardVideo.prepare()
			  .then(() => {
			    // banner Ad is ready
			    // if we set autoShow to false, then we will need to call the show method here
			  })
			  .catch(e => alert(e));
			// this.viewCtrl.dismiss({action: action});
		} else {
			this.viewCtrl.dismiss({action: action});
		}
	}
}