import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null | undefined>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    location.reload()
    if (credential.user) return this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User) {
    if (user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email!, 
      displayName: user.displayName!, 
      photoURL: user.photoURL!
    } 

    return userRef.set(data, { merge: true })
    } else return null

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
