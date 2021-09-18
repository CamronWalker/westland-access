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

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
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
    // private auth: AuthService,
    // private afs: AngularFirestore,
    // private router: Router,
    // private _snackBar: MatSnackBar,
    // 
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
      
      // create a case for each type of qr code
        // Link QR Codes
          // if it's a qr code for a different project renavigate
          // if no project is selected renavigate
        // Number Qr Codes
          // if no project is selected warn to select project
      
      // update accordingly and searchitem

      this.snackbar.info(resultString, 4000, 'top')
    }
    
  }

  searchItem() {
    // check if item exists
    // log using Scan model or open
  }


  getUrlParameter(name: string, params: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(params);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
}
