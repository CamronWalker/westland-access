import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PeopleTablePageComponent } from './people-table-page/people-table-page.component';
import { SharedModule } from '../shared/shared.module';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonNewPageComponent } from './person-new-page/person-new-page.component';



@NgModule({
  declarations: [
    PeopleTablePageComponent,
    PersonPageComponent,
    PersonNewPageComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule
  ]
})
export class PersonModule { }
