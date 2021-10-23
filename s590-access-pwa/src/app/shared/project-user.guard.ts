import { Injectable } from '@angular/core';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { CanActivate } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CustomSnackBarService } from './services/custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: CustomSnackBarService,
  ) {

  }

  canActivate(): Promise<boolean> {
    const isProjectUser = new Promise<boolean>(pu => {
      const projectNum = 'S590'
      this.auth.user$.subscribe(user => {
        const projectDocRef = doc(this.firestore, `projects/${projectNum}`)
        
        docData(projectDocRef, {idField: 'id'}).pipe(take(1)).subscribe(data => {
          if(data.projectUsers.includes(user.uid)) {
            console.log('guard allowed')
            pu(true)
          } else {
            this.snackbar.error('Not Authorized', 4000, 'top')
            pu(false)
          }
        })
      })
    })


    return isProjectUser
  }
  


  // get isLoggedInPromise(): Promise<boolean> {

  //   return new Promise<boolean>(resolve => {
  //      this.auth.user$.pipe(
  //        take(1)
  //      ).subscribe((user: any) => {
  //        resolve(!!user)
  //      })
  //    })
  //  }
  
}
