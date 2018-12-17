import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { SharedService } from '../../helpers/scripts/shared-service';

@Component({
  selector: 'my-records',
  templateUrl: 'my-records.html'
})
export class MyRecordsPage {
  	constructor(public navCtrl: NavController, public sharedService: SharedService, public navParams: NavParams, public storage: Storage) {
	  	if (this.navParams.data.lastPage === 'ScenePage') {
	  		this.navCtrl.remove(this.navCtrl.last().index);
	  	}

	  	this.storage.get('records').then((val) => {
			let records = val ? JSON.parse(val) : [];

			records.forEach((item) => {
				item.date = this.formatDate(item.date)
			})

			this["records"] = records;
		});

		this.setBackBtnAction();
	}

	formatDate (timestamp) {
		let d = new Date(timestamp),
			day = this.twoDigitsFormat(d.getDate()),
			month = this.twoDigitsFormat(d.getMonth() + 1),
			year = d.getFullYear(),
			hours = this.twoDigitsFormat(d.getHours()),
			minutes = this.twoDigitsFormat(d.getMinutes());

		return `${day}.${month}.${year} ${hours}:${minutes}`
	}

	twoDigitsFormat (arg) {
        if ((arg + '').length === 1) {
            arg = '0' + arg;
        }

        return arg;
    }

    goBack() {
		this.navCtrl.pop();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = this.goBack.bind(this);
	}
}
