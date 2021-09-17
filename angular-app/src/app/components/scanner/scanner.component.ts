import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointServiceService } from 'src/app/services/breakpoint-service.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(
    // private fb: FormBuilder,
    // private auth: AuthService,
    // private afs: AngularFirestore,
    // private router: Router,
    // private _snackBar: MatSnackBar,
    // public bp: BreakpointServiceService
  ) { }

  ngOnInit(): void {
  }

}
