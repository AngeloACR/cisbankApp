import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { 
  GuardService as Guard 
} from './services/guard.service';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [Guard],
  },
  {
    path: 'registro', 
    component: RegistroComponent 
  },
  {
    path: '*', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
