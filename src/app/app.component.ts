import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScenePage } from '../pages/scene/scene';
import { HomePage } from '../pages/home/home';
import { SharedService } from '../helpers/scripts/shared-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sharedService: SharedService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      	document.addEventListener('admob.rewardvideo.events.REWARD', () => {
          this["sharedService"]["admob"].rewardVideoCB();
        });
	
	    document.addEventListener('admob.rewardvideo.events.CLOSE', () => {
		    this["sharedService"]["admob"].closeVideoCB();
	    });

	    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', () => {
	    	
	    });
    });
  }
}

