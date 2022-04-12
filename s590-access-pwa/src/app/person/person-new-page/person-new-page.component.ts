import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';
import { map, take, debounceTime} from 'rxjs/operators';

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
      badgeNum: ['', [
        Validators.required,
        Validators.pattern(/^(?:(?:[1-9][0-9]*)|0)$/),
        Validators.maxLength(4),
        BadgeNumValidator.badgeNum(this.firestore)

      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      companyName: ['', [
        Validators.required
      ]],
      tradeName: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      statusDesc: '',
    })
  }


  changeHandler(e: any) {
    this.state = e
  }
}

export class BadgeNumValidator {
  static badgeNum(firestore: Firestore) {
    return (control: AbstractControl) => {
      const badgeNum = control.value
      const badgeNumColRef = collection(firestore, `projects/S590/people`)
      const badgeNumColRefQuery = query(badgeNumColRef, where('badgeNum', '==', badgeNum))

      collectionData(badgeNumColRefQuery, { idField: 'id'}).pipe(
        debounceTime(500),
        take(1),
        map(arr => arr.length ? { badgeNumAvailable: false } : null ),
      )
    }
  }
}