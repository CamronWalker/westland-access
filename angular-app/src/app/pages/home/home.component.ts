import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  
  @Input() projectValue: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.projectValue = changes.projectValue.value;
    console.log(this.projectValue)
  }

}
