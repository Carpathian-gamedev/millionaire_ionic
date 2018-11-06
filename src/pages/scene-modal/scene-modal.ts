import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'scene-modal',
  templateUrl: 'scene-modal.html'
})
export class SceneModal {
  constructor(public viewCtrl: ViewController, public params: NavParams) {
  	this["prize"] = this.params.data.level.price;
  	this["correct"] = this.params.data.correct;
  }

  dismiss(action) {
    this.viewCtrl.dismiss({action: action});
  }
}