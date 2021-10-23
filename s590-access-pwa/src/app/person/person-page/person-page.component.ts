import { Component, OnInit } from '@angular/core';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {
  badgeNumParam!: string | null;
  personData: any;
  personForm!: FormGroup
  state!: string;

  constructor(
    private route: ActivatedRoute,
    private snackbar: CustomSnackBarService,
    private fb: FormBuilder,
    private firestore: Firestore,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.badgeNumParam = paramMap.get('personId');
      
      const personDocRef = doc(this.firestore, `projects/S590/people/${this.badgeNumParam}`)

      docData(personDocRef).subscribe(data => {
        this.personData = data;
      })

    })

    this.personForm = this.fb.group({
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
