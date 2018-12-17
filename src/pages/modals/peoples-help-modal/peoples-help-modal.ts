import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedService } from '../../../helpers/scripts/shared-service';

@Component({
	selector: 'peoples-help-modal',
	templateUrl: 'peoples-help-modal.html'
})
export class PeoplesHelpModal {
	constructor(public viewCtrl: ViewController, public params: NavParams, public sharedService: SharedService) {
		this["level"] = this.params.data.level,
		this["options"] = this.params.data.options.slice();
		this["letters"] = sharedService.getLetters();

		this.setChances();
		this.setBackBtnAction();
	}

	setChances() {
		let arr = [],
			sum = 0;

		this["validOptions"] = 0;
		this["options"].forEach((option) => {
			if (!option.disabled) {
				let num = Math.ceil(Math.random() * 25);

				arr.push(num);
				sum += num;

				this["validOptions"]++;
			}
		});

		this["chancesArray"] = arr.map((num) => {
			return Math.floor((num/sum) * 100) + Math.random() * 0.1 + Math.random() * 0.1 - Math.random() * 0.1;
		});

		this["biggestNumber"] = Math.max(...this["chancesArray"]);
		this["options"].forEach((option) => {
			if (!option.disabled) {
				this.assignChance(option);
			}
		});

		this.normalizeChances();
	}

	assignChance(option) {
		var biggestNumIndex = this["chancesArray"].indexOf(this["biggestNumber"]),
			rand = 0,
			lookForChance = true;

		if (option.correct) {
			option.chance = this["biggestNumber"];

			this["chancesArray"].splice(biggestNumIndex, 1);
		} else {
			while (lookForChance) {
				rand = Math.floor(Math.random() * this["chancesArray"].length);

				if (rand !== biggestNumIndex) {
					lookForChance = false;
					option.chance = this["chancesArray"][rand];

					this["chancesArray"].splice(rand, 1);
				}
			}
		}
	}

	normalizeChances() {
		let normalizer = 0,
			sum = 0;

		this["options"].forEach(function (option) {
			if (option.chance) {
				option.chance = Math.floor(option.chance);
				sum += option.chance;
			}
		});

		normalizer = 100 - sum;
		
		this["options"].forEach(function (option) {
			if (option.correct) {
				option.chance += normalizer;
			}
		});

		console.info(this["options"]);
	}

	setStyle(option) {
		return 'calc(' + option.chance + '% - 5px)'
	}

	dismiss(action) {
		this.viewCtrl.dismiss();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = function () {};
	}
}