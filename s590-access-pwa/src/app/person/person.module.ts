import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PeopleTablePageComponent } from './people-table-page/people-table-page.component';


@NgModule({
  declarations: [
    PeopleTablePageComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
