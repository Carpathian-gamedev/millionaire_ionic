import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeRewardVideoConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class SharedService {
    public states;

    constructor(public admobFree: AdMobFree) {
        this["states"] = {};
        this["admob"] = {
            rewardVideoCB: function () {
                alert('defaultCB');
            }
        };
        this["letters"] = ['A', 'B', 'C', 'D'];
        this["intersitialCounter"] = 0;
        this.resetStates();
    }

    resetStates() {
        this.states = {
            fiftyFifty: false,
            peoplesHelp: false,
            changeQuestion: false,
            forgetWrongAnswer: false
        }
    }

    getState(value) {
        return this["states"][value];
    }

    getStates() {
        return this["states"];
    }

    setState(state, value) {
        this["states"][state] = value;
    }

    getLetters() {
        return this["letters"];
    }

    showVideoAds() {
        const videoConfig: AdMobFreeRewardVideoConfig = {
            // add your config here
            // for the sake of this example we will just use the test config
            // isTesting: true,
            id: 'ca-app-pub-7084542198195077/5255813497',
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
            .catch((e) => {
                this["admob"].closeVideoCB();
                alert('Перевірте підключення до інтернету');
            });
    }

    showIntersitialAds() {
        if (this["intersitialCounter"] % 2 === 0) {
            const intersitialConfig: AdMobFreeInterstitialConfig = {
                // add your config here
                // for the sake of this example we will just use the test config
                // isTesting: true,
                id: 'ca-app-pub-7084542198195077/7019487151',
                autoShow: true
            };
            this.admobFree.interstitial.config(intersitialConfig);
            this.admobFree.interstitial.prepare()
                .then(() => {})
                .catch((e) => {
                    console.info(e)
                })
        }

        this["intersitialCounter"]++;
    }

    backButtonAction() {
        
    }
}