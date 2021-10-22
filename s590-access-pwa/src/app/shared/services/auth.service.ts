import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { of } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from './custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  userResult: boolean = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private snackbar: CustomSnackBarService,
    private route: ActivatedRoute,
    ) {
      this.user$ = user(this.auth).pipe(         
        switchMap(user => {
          if (user) {
            this.userResult = true;
            return docData(doc(this.firestore, `users/${user.uid}`))
          } else {
            this.userResult = true;
            return of(null);
          }
        })
      )


    }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((cred) => {
        this.updateUserData(cred.user)
        this.returnToURL()
      })
  }

  returnToURL() { //if the returnURL param exists redirect after login
    this.route.queryParams.subscribe(async params => {
      const returnURL = params['returnURL'];
      try {this.router.navigate([returnURL]);}
      catch {}
    })
  }
  
  async logout() {
    await signOut(this.auth);
    this.snackbar.success('Successfully Signed Out!', 4000, 'bottom');
    this.router.navigate(['/']);
  }

  private updateUserData(user: any) {
    return setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    }, {merge: true})
  }

  get isLoggedInPromise(): Promise<boolean> {

   return new Promise<boolean>(resolve => {
      this.user$.pipe(
        take(1)
      ).subscribe((user: any) => {
        resolve(!!user)
      })
    })
      


    
    // const userId = this.user$.subscribe(user => {
    //   return user.uid
    // })


    // console.log(userId)
    // return this.user$ ? true : false;
  }
}
