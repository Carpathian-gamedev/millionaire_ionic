import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedService } from '../../../helpers/scripts/shared-service';

@Component({
	selector: 'scene-modal',
	templateUrl: 'scene-modal.html'
})
export class SceneModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, private storage: Storage, public sharedService: SharedService) {
		this["level"] = this.params.data.level;
		this["prize"] = this.params.data.level.price;
		this["correct"] = this.params.data.correct;
		this["states"] = this.sharedService.getStates() || {};
		this["sharedService"]["admob"].rewardVideoCB = this.rewardVideoListener.bind(this);
		this["sharedService"]["admob"].closeVideoCB = this.closeVideoListener.bind(this);

		if (!this["correct"]) {
			this["sharedService"].showIntersitialAds();
		}
		
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
			this["sharedService"].showVideoAds();

			// var event = new Event('admob.rewardvideo.events.REWARD');

			// document.dispatchEvent(event)
			
		} else {
			this.viewCtrl.dismiss({action: action});
		}
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}