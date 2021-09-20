import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointServiceService } from 'src/app/services/breakpoint-service.service';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { Scan } from './scan.model';
import { Person } from 'src/app/services/person.model';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  scannerForm: FormGroup;
  lastScannedString: string;
  scannerChecked: boolean;
  userUID: string;

  constructor(
    public nav: NavComponent,
    private snackbar: CustomSnackBarService,
    public bp: BreakpointServiceService,
    private fb: FormBuilder,
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router,
     
  ) { }

  ngOnInit(): void {



    this.scannerForm = this.fb.group({
      searchField: '',
      showScanner: '',
      navigateScanner: '',
    });

    const lastScannedString = 'asdf' //given value to prevent error, need this to prevent duplicate scans
  }

  onCodeResult(resultString: string) {
    if (this.lastScannedString === resultString) { //This can probably be done a better way with a debouncer but I couldn't fingure it out.
      console.log(this.lastScannedString + ' is a duplicate scan.')
    } else {
      this.lastScannedString = resultString;
      

      
        if (resultString.includes('http') && resultString.includes('?')) {
          const qrCodeParam_proj = this.getUrlParameter('proj','?' + resultString.split('?')[1]);
          const qrCodeParam_id = this.getUrlParameter('id','?' + resultString.split('?')[1]);
        
        //if project !=
        
        
        } else {

          this.scannerForm.setValue({
            navigateScanner: this.scannerForm.get('navigateScanner').value,
            showScanner: true,
            searchField: resultString
          })

        }
        this.searchItem()
      // create a case for each type of qr code
        // Link QR Codes
          // if it's a qr code for a different project renavigate
          // if no project is selected renavigate
        // Number Qr Codes
          // if no project is selected warn to select project
      
      // update accordingly and searchitem

      //this.snackbar.info(resultString, 4000, 'top')
    }
    
  }

  async searchItem() {
    const searchProject = this.nav.projectNumber
    const searchPerson = parseInt(this.scannerForm.get('searchField').value)
    const searchRef = this.afs.doc<Person>(`/projects/${searchProject}/people/${searchPerson}`)
    
    searchRef.ref.get().then(async docSnapshot => {
      // check if person exists
      if(docSnapshot.exists) { //person exists
        //console.log('exists')
        if (this.scannerForm.get('navigateScanner').value === true) { //navigate
          await this.router.navigate(['/people'], { queryParams: { 'proj': searchProject, 'id': searchPerson }})//create this link when I have the route sorted
        } else {//log scan
          
          switch(docSnapshot.data().status) {
            case 'Allowed': {
              this.snackbar.success(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${searchPerson} ) - ${docSnapshot.data().status}`, 4000, 'top');
              break;
            }
            case 'No Access': {
              this.snackbar.error(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${searchPerson} ) - ${docSnapshot.data().status}`, 4000, 'top');
              break;
            }
            case 'Escort Required': {
              this.snackbar.warning(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${searchPerson} ) - ${docSnapshot.data().status}`, 4000, 'top');
              break;
            }
            case 'See Description': {
              this.snackbar.info(`${docSnapshot.data().firstName} ${docSnapshot.data().lastName} ( ${searchPerson} ) - ${docSnapshot.data().status}`, 4000, 'top');
              break;
            }
          }

          this.auth.user$.subscribe(user => {
            this.afs.collection<Scan>(`/projects/${searchProject}/scans`).add({
              personId: searchPerson.toString(),
              personName: docSnapshot.data().firstName + " " + docSnapshot.data().lastName,
              scanResult: docSnapshot.data().status, //going to have to put this in the result
              scanResultDesc: docSnapshot.data().statusDesc,
              scannerUID: user.uid,
              scannerName: user.displayName,
              timeScanned: new Date(),
            })
          })


        }
      } else { //person doesn't exist 
        //console.log('doesnt exist')
        this.snackbar.error(`${searchPerson} doesn't exist in ${searchProject}`, 4000, 'top')



      }
      //remove number from form to prep for new scan/search
      this.scannerForm.setValue({
        navigateScanner: this.scannerForm.get('navigateScanner').value,
        showScanner: this.scannerForm.get('showScanner').value,
        searchField: ''
      })
    })

    // log using Scan model or open
  }


  getUrlParameter(name: string, params: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(params);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
}
