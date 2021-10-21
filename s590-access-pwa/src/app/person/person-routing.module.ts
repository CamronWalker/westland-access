import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleTablePageComponent } from './people-table-page/people-table-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  {
    path: 'table',
    component: PeopleTablePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
