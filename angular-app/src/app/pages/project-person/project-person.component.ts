import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { BreakpointServiceService } from 'src/app/services/breakpoint-service.service';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { Person } from 'src/app/services/person.model';

@Component({
  selector: 'app-project-person',
  templateUrl: './project-person.component.html',
  styleUrls: ['./project-person.component.scss']
})
export class ProjectPersonComponent implements OnInit {
  paramProjectNumber: string;
  paramPersonId: string;
  badgeImageURL: any;
  personSub: Person & { id: string; };
  personForm: any;

  constructor(
    private afStorage: AngularFireStorage,
    public nav: NavComponent,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    public bp: BreakpointServiceService,
    private snackbar: CustomSnackBarService,
    private fb: FormBuilder

    ) { 
      this.route.queryParams.subscribe(async params => { //need the query param select starting project
        this.paramProjectNumber = params['proj'];
        this.paramPersonId = params['id'];
      })
    }

  ngOnInit(): void {
    if (this.paramPersonId && this.paramProjectNumber) {
      this.afs.doc<Person>(`projects/${this.paramProjectNumber}/people/${this.paramPersonId}`).valueChanges({ idField: 'id'}).subscribe(psub => {
        this.personSub = psub

        if (psub.imageURL) { //get imageURL from firebase doc
          this.badgeImageURL = psub.imageURL
        } else { //get dl URL from afStorage
          console.log('getting download URL for user: ' + psub.id )
          this.getURL(psub.imageLocation).then((urlValue) => {
            this.badgeImageURL = urlValue
            this.afs.doc<Person>(`projects/${this.paramProjectNumber}/people/${this.paramPersonId}`).update({ //update it so you don't have to call it storage all the time
              imageURL: this.badgeImageURL
            })
          })
        }

        this.personForm = this.fb.group({
          companyName: this.personSub.companyName,
          firstName: this.personSub.firstName,
          lastName: this.personSub.lastName,
          status: this.personSub.status,
          statusDesc: this.personSub.statusDesc ? this.personSub.statusDesc : '',
          tradeName: this.personSub.tradeName,
        })

      })




    } else {
      if (!this.paramPersonId) {
        this.snackbar.error('No User Selected!', 4000, 'top')
      }
      if (!this.paramProjectNumber) {
        this.snackbar.error('Please Select a Project!', 4000, 'top')
      }
    }

  }

  async getURL(filePath: string) {
    const storageRef = this.afStorage.ref(filePath)
    const storageURL = await storageRef.getDownloadURL().toPromise();
    return storageURL
  }

  async updatePerson() {

    await this.afs.doc<Person>(`projects/${this.paramProjectNumber}/people/${this.paramPersonId}`).update({
      firstName: this.personForm.get('firstName').value,
      lastName: this.personForm.get('lastName').value,
      companyName: this.personForm.get('companyName').value,
      tradeName: this.personForm.get('tradeName').value,
      status: this.personForm.get('status').value,
      statusDesc: this.personForm.get('statusDesc').value,

    }).then(() => {
      this.snackbar.success(`Updated ${this.personSub.id}`, 4000, 'bottom')
    }).catch(err => {
      this.snackbar.error(`ERROR: ${this.personSub.id} was not updated!`, 4000, 'bottom')
    })
    
  }
}
