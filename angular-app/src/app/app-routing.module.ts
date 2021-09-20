import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ScansTableComponent } from './components/scans-table/scans-table.component';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [ 
  {path: '', component: ScansTableComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'scanner', component: ScannerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
