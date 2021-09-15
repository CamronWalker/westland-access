import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

//Angular Material

//

const firebaseConfig = {
  apiKey: "AIzaSyCRLq3j-Yy6XhohnCb7xTSZUCJNluwrfaU",
  authDomain: "westland-access.firebaseapp.com",
  projectId: "westland-access",
  storageBucket: "westland-access.appspot.com",
  messagingSenderId: "714976500037",
  appId: "1:714976500037:web:871b5e69282f547ec4862c",
  measurementId: "G-9EYK1QBZC2"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, AngularFireStorageModule, AngularFireAuthModule // Firebase Imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
