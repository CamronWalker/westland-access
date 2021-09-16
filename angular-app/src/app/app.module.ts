import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';


// Project Pages
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
  //MatCardModule

// Project Components

import { IdBadgeComponent } from './components/id-badge/id-badge.component';
  import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'; //qr-code
  import { NgxPrintModule } from 'ngx-print';

import { NavComponent } from './components/nav/nav.component';
  import { LayoutModule } from '@angular/cdk/layout';

import { ScannerComponent } from './components/scanner/scanner.component';
  import { ZXingScannerModule } from '@zxing/ngx-scanner';


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
    UserProfileComponent,
    HomeComponent,
    IdBadgeComponent,
    NavComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, AngularFireStorageModule, AngularFireAuthModule, // Firebase Imports
    NgxQRCodeModule, NgxPrintModule, ZXingScannerModule,
    BrowserAnimationsModule, MatButtonModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
