import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPeopleTableComponent } from './components/project-people-table/project-people-table.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ScansTableComponent } from './components/scans-table/scans-table.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectPersonComponent } from './pages/project-person/project-person.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'scanner', component: ScannerComponent},
  {path: 'project', component: ProjectPeopleTableComponent},
  {path: 'people', component: ProjectPersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
