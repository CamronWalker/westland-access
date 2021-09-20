import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
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

  constructor(
    private afStorage: AngularFireStorage,
    public nav: NavComponent,
    private route: ActivatedRoute,
    private afs: AngularFirestore

    ) { 
      this.route.queryParams.subscribe(async params => { //need the query param select starting project
        this.paramProjectNumber = params['proj'];
        this.paramPersonId = params['id'];
      })
    }

  ngOnInit(): void {
    if (this.paramPersonId && this.paramProjectNumber) {
      this.afs.doc<Person>(`projects/${this.paramProjectNumber}/people/${this.paramPersonId}`).valueChanges({ idField: 'id'}).subscribe(psub => {
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
      })

    }

  }

  async getURL(filePath: string) {
    const storageRef = this.afStorage.ref(filePath)
    const storageURL = await storageRef.getDownloadURL().toPromise();
    return storageURL
  }
}
