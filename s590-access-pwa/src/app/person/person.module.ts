import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PeopleTablePageComponent } from './people-table-page/people-table-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PeopleTablePageComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule
  ]
})
export class PersonModule { }
