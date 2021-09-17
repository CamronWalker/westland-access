import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


interface Project {
  projectName: string;
  projectUsers: [string];
  projectImageURL?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  projectNumber!: Observable<string>;
  projectForm!: FormGroup;
  projectsCollection!: AngularFirestoreCollection<Project>;
  projectsList$: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AuthService,
    private fb: FormBuilder, 
    private afs: AngularFirestore,
    ) {}

ngOnInit() {
  this.auth.user$.subscribe(user => {
    this.projectsCollection = this.afs.collection('projects', ref => {
      return ref.where('projectUsers', 'array-contains', user.uid);
    });

    this.projectsCollection.valueChanges({ idField: 'id' }).subscribe(proj => {
      this.projectsList$ = proj;
      //console.log(this.projectsList$)
    })


  })



  this.projectForm = this.fb.group({
    projectDrop: '',
  });

  this.projectForm.valueChanges.subscribe(proj => {
    this.projectNumber = proj.projectDrop;
  })

 }



    // foods: Food[] = [
    //   {projectValue: 'steak-0', viewValue: 'Steak'},
    //   {projectValue: 'pizza-1', viewValue: 'Pizza'},
    //   {projectValue: 'tacos-2', viewValue: 'Tacos'}
    // ];
}
  