import { Component, OnChanges, OnInit } from '@angular/core';
import { NavComponent } from 'src/app/components/nav/nav.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  
  constructor(
    public nav: NavComponent,
  ) { }

  ngOnInit(): void {
    //console.log(this.nav.projectNumber)
  }

}
