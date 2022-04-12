import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';

@Component({
  selector: 'app-person-new-page',
  templateUrl: './person-new-page.component.html',
  styleUrls: ['./person-new-page.component.scss']
})
export class PersonNewPageComponent implements OnInit {
  newPersonForm!: FormGroup;
  state!: string;

  constructor(
    private snackbar: CustomSnackBarService,
    private fb: FormBuilder,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.newPersonForm = this.fb.group({
      badgeNum: '',
      firstName: '',
      lastName: '',
      companyName: '',
      tradeName: '',
      status: '',
      statusDesc: '',
    })
  }


  changeHandler(e: any) {
    this.state = e
  }
}
