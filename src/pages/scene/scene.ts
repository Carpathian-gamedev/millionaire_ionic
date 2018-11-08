import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SceneModal } from '../scene-modal/scene-modal';
import { HomePage } from '../home/home';
import { SharedService } from '../../app/shared-service';

@Component({
	selector: 'scene',
	templateUrl: 'scene.html'
})
export class ScenePage {
	public level;
	public animationTimeout = 300;
	public optionSelectionTimeout = 1000;
	public blinks = 5;
	public callModalTime = this.optionSelectionTimeout + this.blinks * this.animationTimeout + 1100;

	constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public modalCtrl: ModalController, public sharedService: SharedService) {
		if (this.navParams.data.lastPage !== 'HomePage') {
			this.navCtrl.remove(this.navCtrl.last().index);
		}

		this["levelsCounter"] = 0;
		this["level"] = {};
		this["states"] = this.sharedService.getStates();

		this.setSceneData(this.navParams.data.sceneInfo);
	}

	setSceneData(data) {
		let index = this["levelsCounter"],
			options;

		this["options"] = [];
		this["level"] = data["levels"][index];
		this["question"] = this["level"]["questions"][0];

		options = this["question"]["options"];

		for (var i = 0; i < options.length; i++) {
			let option = options[i],
			correct = false;

			if (option[0] === '_') {
				option = option.substring(1, option.length);
				correct = true;
			}

			this["options"].push({
				txt: option,
				correct: correct
			})
		}
	}

	chooseOption(option) {
		let correctOption;
		
		if (option.disabled) {
			return;
		}

		option.clicked = true;

		setTimeout(() => {
			option.selected = true;

			if (option.correct) {
				correctOption = option;
			} else {
				for (var i = 0; i < this["options"].length; i++) {
					if (this["options"][i].correct) {
						correctOption = this["options"][i];
						correctOption.selected = true;
					}
				}
			}

			this.startAnimation(correctOption, 0);
		}, this.optionSelectionTimeout);

		setTimeout(() => {
			this.callModal(option);
		}, this.callModalTime)
	}

	fiftyFifty() {
		var indexes = [],
			randIndex;

		if (this.sharedService.getState('fiftyFifty')) {
			return;
		}

		this.sharedService.setState('fiftyFifty', true);
		this.states['fiftyFifty'] = true;

		while (indexes.length < 2) {
			randIndex = (Math.random() * 4) - 0.1;
			randIndex = randIndex > 0 ? Math.floor(randIndex) : 0;

			if (!this["options"][randIndex].correct && indexes.indexOf(randIndex) < 0) {
				indexes.push(randIndex);
			}
		}

		for (var i = 0; i < indexes.length; i++) {
			this.options[indexes[i]].disabled = true;
		}
	}

	callModal(option) {
		let profileModal = this.modalCtrl.create(SceneModal, {level: this.level || {}, correct: option.correct});

		profileModal.present();

		profileModal.onDidDismiss(data => {
			if (data.action === 'goForward') {
				this["levelsCounter"]++;
				this.setSceneData(this.navParams.data.sceneInfo);
			} else if (data.action === 'takePrize') {
				this.navCtrl.push(HomePage, {}, {animate: false});
			} else if (data.action === 'newGame') {
				this.http.get('assets/fake_json/story1.json')
					.subscribe(response => {
							let data = JSON.parse(response["_body"]);

							this.sharedService.resetStates();
							this.navCtrl.push(ScenePage, {sceneInfo: data}, {animate: false});
						}, xhr => {
							console.log(xhr);
						});
			}
		});
	}

	startAnimation(option, counter) {
		counter++;
		option.selected = !option.selected;

		setTimeout(() => {
			if (counter > this.blinks) {
				return;
			}

			this.startAnimation(option, counter);
		}, this.animationTimeout);
	}
}