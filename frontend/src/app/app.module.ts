import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { AlertTableComponent } from './alert-table/alert-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertPageComponent,
    NavBarComponent,
    PatientTableComponent,
    AlertTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
