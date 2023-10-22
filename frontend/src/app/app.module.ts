import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { AlertTableComponent } from './alert-table/alert-table.component';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertPageComponent,
    NavBarComponent,
    PatientTableComponent,
    AlertTableComponent,
    RootComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
