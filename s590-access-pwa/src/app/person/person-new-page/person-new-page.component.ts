import { Component, OnInit } from '@angular/core';
import { doc, setDoc, Firestore, query, where } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';
import { map, take, debounceTime} from 'rxjs/operators';
import { Observable } from 'rxjs';

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
        ],
        // this.BadgeNumValidator
      ],
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


  get badgeNum() {
    return this.newPersonForm.get('badgeNum')?.value
  }
  get firstName() {
    return this.newPersonForm.get('firstName')?.value
  }
  get lastName() {
    return this.newPersonForm.get('lastName')?.value
  }
  get companyName() {
    return this.newPersonForm.get('companyName')?.value
  }
  get tradeName() {
    return this.newPersonForm.get('tradeName')?.value
  }
  get status() {
    return this.newPersonForm.get('status')?.value
  }
  get statusDesc() {
    return this.newPersonForm.get('statusDesc')?.value
  }

  addUserEvent() {
    //console.log(this.badgeNum.toString().length);

    const searchArrayBuilder = []
    const fullName = this.firstName + ' ' + this.lastName
    

    // Create search array that I use to filter the People Table
    for (var i = 0; i < this.badgeNum.toString().length; i++) {
      searchArrayBuilder.push(this.badgeNum.toString().substring(0, i+1))
    }
    for ( var i = 0; i < fullName.length; i++) {
      searchArrayBuilder.push(fullName.substring(0, i+1))
    }
    for ( var i = 0; i < this.lastName.length; i++) {
      searchArrayBuilder.push(this.lastName.substring(0, i+1))
    }
    for ( var i = 0; i < this.companyName.length; i++) {
      searchArrayBuilder.push(this.companyName.substring(0, i+1))
    }

    const newUserData = {
      badgeNum: this.badgeNum,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      tradeName: this.tradeName,
      status: this.status,
      statusDesc: this.statusDesc,
      searchArray: searchArrayBuilder,
    }

    console.log(newUserData)

    setDoc(doc(this.firestore, `projects/S590/people`, this.badgeNum), newUserData, { merge:true })

  }

//   BadgeNumValidator(control: FormControl): Promise<any> | Observable<any> {
//     console.log(control.value)
//     const response = new Promise((resolve, reject)=> {
//       const badgeNumConst = control.value
//       const badgeNumColRef = collection(this.firestore, 'projects/S590/people')
//       const badgeNumColRefQuery = query(badgeNumColRef, where('badgeNum', '==', badgeNumConst))

//       collectionData(badgeNumColRefQuery, { idField: 'id'}).pipe(
//         debounceTime(500),
//         take(1),
//         map(arr => arr.length ? resolve({ badgeNumAvailable: false }) : resolve(null) ),
//       )

//     })
//     console.log(response)
//     return response;
//   }
// }

// export class BadgeNumValidator {
//   static checkIfBadgeNumExists(firestore: Firestore) {
//     return new Promise<ValidationErrors | null> (resolve => {
//       (control: AbstractControl) => {
//         const badgeNum = control.value
//         const badgeNumColRef = collection(firestore, `projects/S590/people`)
//         const badgeNumColRefQuery = query(badgeNumColRef, where('badgeNum', '==', badgeNum))
  
//         collectionData(badgeNumColRefQuery, { idField: 'id'}).pipe(
//           debounceTime(500),
//           take(1),
//           map(arr => arr.length ? { badgeNumAvailable: false } : null ),
//         )
        
//       }
//     })






//     // return new Promise (resolve => {
//     //   (control: AbstractControl) => {
//     //     const badgeNum = control.value
//     //     const badgeNumColRef = collection(firestore, `projects/S590/people`)
//     //     const badgeNumColRefQuery = query(badgeNumColRef, where('badgeNum', '==', badgeNum))
  
//     //     collectionData(badgeNumColRefQuery, { idField: 'id'}).pipe(
//     //       debounceTime(500),
//     //       take(1),
//     //       map(arr => arr.length ? { badgeNumAvailable: false } : null ),
//     //     )
//     //   }
//     // })
    
     

//   }
}