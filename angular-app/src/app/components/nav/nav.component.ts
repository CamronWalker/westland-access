import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';



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
  startProject: string;
  activatedRoute: ActivatedRoute;
  avbProject: boolean;
  avbProjectsCheck: boolean[];
  personID: any;

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
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: CustomSnackBarService
    ) {
      this.route.queryParams.subscribe(async params => { //need the query param select starting project
        this.startProject = params['proj'];
        this.projectNumber = params['proj'];
        this.personID = params['id'];
      })

    }

ngOnInit() {
  
  this.auth.user$.subscribe(user => {
    this.projectsCollection = this.afs.collection('projects', ref => {
      return ref.where('projectUsers', 'array-contains', user.uid);
    });

    this.projectsCollection.valueChanges({ idField: 'id' }).subscribe(proj => {
      this.projectsList$ = proj;//List for the dropdown

      //find a way to get this to check if the project exists if not then snackbar and error
      this.avbProjectsCheck = proj.map(x => x.id === this.startProject)
      let checker = (arr: any[]) => arr.every(v => v === false) //I need this to check to see if any of the values are false: https://stackoverflow.com/questions/53897673/check-if-all-values-in-array-are-true-then-return-a-true-boolean-statement-jav
      
      this.avbProject = checker(this.avbProjectsCheck) //boolean check if project exists in the projectsList$

      if (this.avbProject && this.startProject) {
        this.snackbar.error(`You don't have access to this project! (${this.startProject})`, 10000, 'top');
        console.log(`Error: (proj=${this.startProject}) User has no access to this project or the project doesn't exist!`)
      } 
      
      this.projectForm.get('projectDrop').setValue(this.startProject)
    })


  })



  this.projectForm = this.fb.group({
    projectDrop: '',
  });

  this.projectForm.valueChanges.subscribe(proj => {
    this.projectNumber = proj.projectDrop;

    this.router.navigate(
      [], {
        relativeTo: this.activatedRoute,
        queryParams: { proj: this.projectNumber},
        queryParamsHandling: 'merge'
      }

    )
  })

 }




}
  