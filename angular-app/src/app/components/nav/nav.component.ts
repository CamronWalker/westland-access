import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms'


interface Food {
  projectValue: string;
  viewValue: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  projectNumber!: Observable<string>;
  projectForm!: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AuthService,
    private fb: FormBuilder, 
    ) {}

ngOnInit() {
  this.projectForm = this.fb.group({
    projectDrop: '',
  });

  this.projectForm.valueChanges.subscribe(proj => {
    this.projectNumber = proj.projectDrop;
  })

 }
 
    foods: Food[] = [
      {projectValue: 'steak-0', viewValue: 'Steak'},
      {projectValue: 'pizza-1', viewValue: 'Pizza'},
      {projectValue: 'tacos-2', viewValue: 'Tacos'}
    ];
}
