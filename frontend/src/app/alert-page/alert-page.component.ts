import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent {
  provider: Provider;
  
  constructor(private router: Router, currentProvider: Provider) {
    this.provider = currentProvider;
  }
}
