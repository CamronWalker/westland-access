import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { NavComponent } from 'src/app/components/nav/nav.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  
  //@Input() projectValue: string | undefined;
@ContentChild(NavComponent) projectValue!: string; 
  
  constructor(
    public nav: NavComponent,
  ) { }

  ngOnInit(): void {
    console.log(this.nav.projectNumber)
  }

  ngOnChanges(changes: any) {
  }

}
