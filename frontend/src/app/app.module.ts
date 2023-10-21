import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertPageComponent,
    NavBarComponent,
    PatientTableComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
