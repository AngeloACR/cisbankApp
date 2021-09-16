import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionComponent } from './components/administracion/administracion.component';
import { BanksComponent } from './components/banks/banks.component';
import { TAccountsComponent } from './components/t-accounts/t-accounts.component';
import { BlankComponent } from './components/blank/blank.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { MovementsComponent } from './components/movements/movements.component';

import {
  GuardService as Guard
} from '../services/guard.service';
import {
  RoleGuardService as RoleGuard
} from '../services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    canActivate: [Guard],
  },
  {
    path: 'adm/:id',
    component: AdministracionComponent,
    canActivate: [Guard],
    data: { role: 'Admin' }
  },
  {
    path: 'bancos/:id',
    component: BanksComponent,
    canActivate: [Guard],
  },
  {
    path: 'taccs/:id',
    component: TAccountsComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin'
    }
  },
  {
    path: 'cashflow/:id',
    component: CashFlowComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin'
    }
  },
  {
    path: 'estadisticas/:id',
    component: EstadisticasComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin'
    }
  },
  {
    path: 'moves/:id',
    component: MovementsComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

  constructor(
  ) {

  }

}
