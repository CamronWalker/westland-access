import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointServiceService } from 'src/app/services/breakpoint-service.service';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';

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
      navigateScanner: true,
    });

  }

  onCodeResult(resultString: string) {
    this.snackbar.info(resultString, 2000, 'top')
  }

  searchItem() {

  }


  getUrlParameter(name: string, params: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(params);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
}
