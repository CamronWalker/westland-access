import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


interface Food {
  projectValue: string;
  viewValue: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AuthService) {}


    foods: Food[] = [
      {projectValue: 'steak-0', viewValue: 'Steak'},
      {projectValue: 'pizza-1', viewValue: 'Pizza'},
      {projectValue: 'tacos-2', viewValue: 'Tacos'}
    ];


    updateSelection(event: any) {
      

    }
}
