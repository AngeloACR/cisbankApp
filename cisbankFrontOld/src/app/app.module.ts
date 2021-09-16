import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { PapaParseModule } from 'ngx-papaparse';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { Mod1Component } from './components/mod1/mod1.component';
import { Mod1bComponent } from './components/mod1b/mod1b.component';
import { Mod2Component } from './components/mod2/mod2.component';
import { Mod2bComponent } from './components/mod2b/mod2b.component';
import { Mod3Component } from './components/mod3/mod3.component';
import { Mod3bComponent } from './components/mod3b/mod3b.component';
import { Mod4Component } from './components/mod4/mod4.component';
import { Mod4bComponent } from './components/mod4b/mod4b.component';
import { Mod5Component } from './components/mod5/mod5.component';
import { Mod5bComponent } from './components/mod5b/mod5b.component';
import { Mod5cComponent } from './components/mod5c/mod5c.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { Mod4cComponent } from './components/mod4c/mod4c.component';
import { Mod3cComponent } from './components/mod3c/mod3c.component';

import { registerLocaleData } from '@angular/common';
import localeVE from '@angular/common/locales/es-VE';
import { Mod2cComponent } from './components/mod2c/mod2c.component';

registerLocaleData(localeVE, 'es-VE');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Mod1Component,
    Mod1bComponent,
    Mod2Component,
    Mod2bComponent,
    Mod3Component,
    Mod3bComponent,
    Mod4Component,
    Mod4bComponent,
    Mod5Component,
    Mod5bComponent,
    Mod5cComponent,
    SidemenuComponent,
    Mod4cComponent,
    Mod3cComponent,
    Mod2cComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PapaParseModule,
    HttpClientModule,
    ReactiveFormsModule        
  ],
  providers: [
  DatePipe,
  { provide: LOCALE_ID, useValue: 'es-VE' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
