import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileValueAccessor } from './directives/fileControl';
import { FileValidator } from './directives/fileValidator';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { registerLocaleData } from '@angular/common';
import localeVE from '@angular/common/locales/es-VE';
import { RegistroComponent } from './components/registro/registro.component';

registerLocaleData(localeVE, 'es-VE');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RegistroComponent,
    FileValueAccessor,
    FileValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    FontAwesomeModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'es-VE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
