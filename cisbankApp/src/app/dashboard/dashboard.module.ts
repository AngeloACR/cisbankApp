import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { FileValueAccessor } from '../directives/fileControl';
import { FileValidator } from '../directives/fileValidator';

import { DashboardComponent } from './dashboard.component';
import { BanksComponent } from './components/banks/banks.component';
import { TAccountsComponent } from './components/t-accounts/t-accounts.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { BlankComponent } from './components/blank/blank.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { MovementsComponent } from './components/movements/movements.component';
import { DbHandlerService } from './services/db-handler.service';

@NgModule({
  declarations: [
    DashboardComponent,
    BanksComponent,
    TAccountsComponent,
    AdministracionComponent,
    HeaderComponent,
    SidemenuComponent,
    BlankComponent,
    CashFlowComponent,
    EstadisticasComponent,
    MovementsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],  exports: [
    DashboardComponent
  ],
  providers: [
    DbHandlerService,
    DatePipe,
  ],
})
export class DashboardModule { }
