import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MillionPage } from '../pages/million-page/million-page';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ScenePage } from '../pages/scene/scene';
import { SceneModal } from '../pages/modals/scene-modal/scene-modal';
import { ChangeQuestionModal } from '../pages/modals/change-question-modal/change-question-modal';
import { PeoplesHelpModal } from '../pages/modals/peoples-help-modal/peoples-help-modal';
import { InfoModal } from '../pages/modals/info-modal/info-modal';
import { SharedService } from '../helpers/scripts/shared-service';
import { NumberShortenerPipe } from '../helpers/scripts/number-shortener.pipe';

@NgModule({
  declarations: [
    MyApp,
    SceneModal,
    ChangeQuestionModal,
    PeoplesHelpModal,
    InfoModal,
    ScenePage,
    HomePage,
    MillionPage,
    AboutUsPage,
    NumberShortenerPipe
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
    ChangeQuestionModal,
    PeoplesHelpModal,
    InfoModal,
    HomePage,
    MillionPage,
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
