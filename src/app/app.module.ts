import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ScenePage } from '../pages/scene/scene';
import { SceneModal } from '../pages/modals/scene-modal/scene-modal';
import { FriendsHelpModal } from '../pages/modals/friends-help-modal/friends-help-modal';
import { PeoplesHelpModal } from '../pages/modals/peoples-help-modal/peoples-help-modal';
import { SharedService } from './shared-service';

@NgModule({
  declarations: [
    MyApp,
    SceneModal,
    FriendsHelpModal,
    PeoplesHelpModal,
    ScenePage,
    HomePage,
    AboutUsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SceneModal,
    FriendsHelpModal,
    PeoplesHelpModal,
    HomePage,
    AboutUsPage,
    ScenePage
  ],
  providers: [
    StatusBar,
    SharedService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
