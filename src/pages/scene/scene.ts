import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { MillionPage } from '../million-page/million-page';
import { MyRecordsPage } from '../my-records/my-records';
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

	constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public modalCtrl: ModalController, public sharedService: SharedService, private storage: Storage) {
		if (this.navParams.data.lastPage !== 'HomePage') {
			this.navCtrl.remove(this.navCtrl.last().index);
		}

		this["levelsCounter"] = 0;
		this["level"] = {};
		this["states"] = this.sharedService.getStates();
		this["letters"] = sharedService.getLetters();

		this.setSceneData(this.navParams.data.sceneInfo, '');
		this.setBackBtnAction();
	}

	setSceneData(data, excludedQuestionIndex) {
		let index = this["levelsCounter"],
			options;

		this["options"] = [];
		this["level"] = data["levels"][index];
		this["questionIndex"] = this.generateRandomIndex(this["level"]["questions"], excludedQuestionIndex);
		this["question"] = this["level"]["questions"][this["questionIndex"]];

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

				if (this["level"].price === 1000000) {
					this.writeVictory();
				}
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

	generateRandomIndex(items, except) {
		let indexFound = false,
			length = items.length,
			rand;

		while (!indexFound) {
			rand = Math.floor(Math.random() * length - 0.001);

			if (length > 1) {
				if ((typeof except === 'number' && rand != except) || !except) {
					indexFound = true;
				}
			} else {
				indexFound = true;
			}

			if (rand < 0 || rand >= length) {
				indexFound = false;
			} 
		}

		return rand;
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

	changeQuestion() {
		if (this.sharedService.getState('changeQuestion')) {
			return;
		}

		this.sharedService.setState('changeQuestion', true);
		this["states"]['changeQuestion'] = true;
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
		changeQuestionModal.onDidDismiss(data => {
			if (data.action === 'watchVideoToChangeQuestion') {
				this.setSceneData(this.navParams.data.sceneInfo, this["questionIndex"]);
				this.setBackBtnAction();
			}
		});
	}

	callPeoplesHelpModal() {
		let peoplesHelpModal = this.modalCtrl.create(PeoplesHelpModal, {level: this.level || {}, question: this["question"], options: this["options"]});
		
		peoplesHelpModal.present();
		peoplesHelpModal.onDidDismiss(() => {
			this.setBackBtnAction();
		});
	}

	callSelectionModal(option) {
		let profileModal = this.modalCtrl.create(SceneModal, {level: this.level || {}, correct: option.correct});

		profileModal.present();
		profileModal.onDidDismiss(data => {
			if (data.action === 'goForward') {
				this["levelsCounter"]++;
				this.setSceneData(this.navParams.data.sceneInfo, '');
				this.setBackBtnAction();
			} else if (data.action === 'takePrize') {
				this.navCtrl.push(MyRecordsPage, {lastPage: 'ScenePage'}, {animate: false});
			} else if (data.action === 'goHome') {
				this.navCtrl.push(HomePage, {}, {animate: false});
			} else if (data.action === 'goToMillion') {
				this.navCtrl.push(MillionPage, {}, {animate: false});
			} else if (data.action === 'watchVideoToContinue') {
				this.sharedService.setState('forgetWrongAnswer', true);
				this["states"]['forgetWrongAnswer'] = true;
				this.setSceneData(this.navParams.data.sceneInfo, '');
				this.setBackBtnAction();
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
		infoModal.onDidDismiss(() => {
			this.setBackBtnAction();
		});
	}

	writeVictory() {
		this.storage.get('records').then((val) => {
			let records = val ? JSON.parse(val) : [];

			records.unshift({date: new Date().getTime(), prize: 1000000});

			this.storage.set('records', JSON.stringify(records));
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

	goBack() {
		this.navCtrl.pop();
	}

	setBackBtnAction() {
		this["sharedService"].backButtonAction = this.goBack.bind(this);
	}
}