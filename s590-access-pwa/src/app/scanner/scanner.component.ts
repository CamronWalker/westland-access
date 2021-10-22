import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { BreakpointService } from '../shared/services/breakpoint.service';
import { CustomSnackBarService } from '../shared/services/custom-snackbar.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  scannerForm!: FormGroup
  lastScan?: string;
  scannerTableStatus: 'loading' | 'ready' = 'loading' //using this state manager so that I don't get a bunch of console errors

  constructor(
    private fb: FormBuilder,
    private snackbar: CustomSnackBarService,
    private firestore: Firestore,
    private auth: AuthService,
    private bp: BreakpointService
  ) { }

  ngOnInit(): void {

    if (this.bp.currentScreenSize == 'XSmall') { //seporating out mobile for the default scanner on or off setting
      
      this.auth.user$.pipe(take(1)).subscribe(user => { //I only get this once because I only need it for the preloaded preference
        this.scannerForm = this.fb.group({
          searchField: [''],
          showScanner: user.defaultScanner, 
          openOrScan: {value: false, disabled: true}, //locked on false until open page works TODO: create logic for it to be false if not signed in
        })
        this.scannerTableStatus = 'ready' 

      })
    } else {
      this.scannerForm = this.fb.group({
        searchField: [''],
        showScanner: '',
        openOrScan: {value: false, disabled: true}, //locked on false until open page works TODO: create logic for it to be false if not signed in
      })
      this.scannerTableStatus = 'ready'
    }

  }

  onCodeResult(resultString: string) {
    if (this.lastScan != resultString) {
      this.lastScan = resultString
      this.searchField?.patchValue(resultString)
      this.searchBadge();
    }
  }

  searchBadge() {

    const badgeNum = parseInt(this.searchField?.value)

    const personRef = doc(this.firestore, `projects/S590/people/${badgeNum}`)

    getDoc(personRef).then(async docSnapshot => {
      if (docSnapshot.exists()) {
        
        switch(docSnapshot.data().status) {
          case 'Allowed': {
            this.snackbar.success(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${badgeNum} ) - ${docSnapshot.data().status}`, 4000, 'top');
            break;
          }
          case 'No Access': {
            this.snackbar.error(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${badgeNum} ) - ${docSnapshot.data().status}`, 4000, 'top');
            break;
          }
          case 'Escort Required': {
            this.snackbar.warning(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${badgeNum} ) - ${docSnapshot.data().status}`, 4000, 'top');
            break;
          }
          case 'See Description': {
            this.snackbar.info(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${badgeNum} ) - ${docSnapshot.data().status}`, 4000, 'top');
            break;
          }
        }
       
          this.auth.user$.subscribe(async user => {
            if (user) {
              await addDoc(collection(this.firestore, "projects/S590/scans/"), {
                personId: badgeNum.toString(),
                personName: docSnapshot.data().firstName + " " + docSnapshot.data().lastName,
                scanResult: docSnapshot.data().status, //going to have to put this in the result
                scanResultDesc: docSnapshot.data().statusDesc,
                scannerUID: user.uid,
                scannerName: user.displayName,
                timeScanned: new Date(),
              })
            } else {
              await addDoc(collection(this.firestore, "projects/S590/scans/"), {
                personId: badgeNum.toString(),
                personName: docSnapshot.data().firstName + " " + docSnapshot.data().lastName,
                scanResult: docSnapshot.data().status, //going to have to put this in the result
                scanResultDesc: docSnapshot.data().statusDesc,
                scannerUID: "anonymous",
                scannerName: "anonymous",
                timeScanned: new Date(),
              })
            }
          })
      

      } else {
        this.snackbar.error(`${badgeNum} doesn't exist in ${badgeNum}`, 4000, 'top')

      }

    })

  

      this.searchField?.patchValue('')
  }

  get searchField() {
    return this.scannerForm.get('searchField');
  }
}
