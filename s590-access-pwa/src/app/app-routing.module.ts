import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  {path: '', component: ScannerComponent},
  { path: 'my-settings', loadChildren: () => 
    import('./user/user.module').then(m => m.UserModule),
  },
  { path: 'p', loadChildren: () => 
  import('./person/person.module').then(m => m.PersonModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
