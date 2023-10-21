import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertPageComponent } from './alert-page/alert-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'alertPage', pathMatch: 'full' },
  { path: 'alertPage', component: AlertPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
