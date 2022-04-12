import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectUserGuard } from '../shared/project-user.guard';
import { PeopleTablePageComponent } from './people-table-page/people-table-page.component';
import { PersonNewPageComponent } from './person-new-page/person-new-page.component';
import { PersonPageComponent } from './person-page/person-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  {
    path: 'new',
    component: PersonNewPageComponent,
    canActivate: [ProjectUserGuard]
  },
  {
    path: 'table',
    component: PeopleTablePageComponent,
    canActivate: [ProjectUserGuard]
  },
  {
    path:':personId', component: PersonPageComponent,
    canActivate: [ProjectUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
