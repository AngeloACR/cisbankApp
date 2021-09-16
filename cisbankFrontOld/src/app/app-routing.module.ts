import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Mod1Component } from './components/mod1/mod1.component';
import { Mod1bComponent } from './components/mod1b/mod1b.component';
import { Mod2Component } from './components/mod2/mod2.component';
import { Mod2bComponent } from './components/mod2b/mod2b.component';
import { Mod2cComponent } from './components/mod2c/mod2c.component';
import { Mod3Component } from './components/mod3/mod3.component';
import { Mod3bComponent } from './components/mod3b/mod3b.component';
import { Mod3cComponent } from './components/mod3c/mod3c.component';
import { Mod4Component } from './components/mod4/mod4.component';
import { Mod4bComponent } from './components/mod4b/mod4b.component';
import { Mod5Component } from './components/mod5/mod5.component';
import { Mod5bComponent } from './components/mod5b/mod5b.component';
import { Mod5cComponent } from './components/mod5c/mod5c.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { Mod4cComponent } from './components/mod4c/mod4c.component';

const routes: Routes = [
  {path: 'mod1', component: Mod1Component},
  {path: 'mod1b', component: Mod1bComponent},
  {path: 'mod2', component: Mod2Component},
  {path: 'mod2b', component: Mod2bComponent},
  {path: 'mod2c', component: Mod2cComponent},
  {path: 'mod3', component: Mod3Component},
  {path: 'mod3b', component: Mod3bComponent},
  {path: 'mod3c', component: Mod3cComponent},
  {path: 'mod4', component: Mod4Component},
  {path: 'mod4b', component: Mod4bComponent},
  {path: 'mod4c', component: Mod4cComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
