import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { MillionPage } from '../million-page/million-page';
import { SceneModal } from '../modals/scene-modal/scene-modal';
import { ChangeQuestionModal } from '../modals/change-question-modal/change-question-modal';
import { PeoplesHelpModal } from '../modals/peoples-help-modal/peoples-help-modal';
import { InfoModal } from '../modals/info-modal/info-modal';
import { SharedService } from '../../helpers/scripts/shared-service';

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
		this["letters"] = sharedService.getLetters();

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
			this.callSelectionModal(option);
		}, this.callModalTime)
	}

	fiftyFifty() {
		var indexes = [],
			randIndex;

		if (this.sharedService.getState('fiftyFifty')) {
			return;
		}

		this.sharedService.setState('fiftyFifty', true);
		this["states"]['fiftyFifty'] = true;

		while (indexes.length < 2) {
			randIndex = (Math.random() * 4) - 0.1;
			randIndex = randIndex > 0 ? Math.floor(randIndex) : 0;

			if (!this["options"][randIndex].correct && indexes.indexOf(randIndex) < 0) {
				indexes.push(randIndex);
			}
		}

		for (var i = 0; i < indexes.length; i++) {
			this["options"][indexes[i]].disabled = true;
		}
	}

	friendsHelp() {
		if (this.sharedService.getState('friendsHelp')) {
			return;
		}

		this.sharedService.setState('friendsHelp', true);
		this["states"]['friendsHelp'] = true;

		this.callChangeQuestionModal();
	}

	peoplesHelp() {
		if (this.sharedService.getState('peoplesHelp')) {
			return;
		}

		this.sharedService.setState('peoplesHelp', true);
		this["states"]['peoplesHelp'] = true;

		this.callPeoplesHelpModal();
	}

	callChangeQuestionModal() {
		let changeQuestionModal = this.modalCtrl.create(ChangeQuestionModal, {level: this.level || {}, options: this["options"]});
		
		changeQuestionModal.present();
	}

	callPeoplesHelpModal() {
		let peoplesHelpModal = this.modalCtrl.create(PeoplesHelpModal, {level: this.level || {}, question: this["question"], options: this["options"]});
		
		peoplesHelpModal.present();
	}

	callSelectionModal(option) {
		let profileModal = this.modalCtrl.create(SceneModal, {level: this.level || {}, correct: option.correct});

		profileModal.present();

		profileModal.onDidDismiss(data => {
			if (data.action === 'goForward') {
				this["levelsCounter"]++;
				this.setSceneData(this.navParams.data.sceneInfo);
			} else if (data.action === 'takePrize') {
				this.navCtrl.push(HomePage, {}, {animate: false});
			} else if (data.action === 'goToMillion') {
				this.navCtrl.push(MillionPage, {}, {animate: false});
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

	callInfoModal() {
		let infoModal = this.modalCtrl.create(InfoModal, {levels: this.navParams.data.sceneInfo["levels"], level: this["level"]});

		infoModal.present();
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