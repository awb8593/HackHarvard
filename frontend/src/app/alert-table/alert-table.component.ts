import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';4
import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.css']
})
export class AlertTableComponent implements OnInit {
  
  currentProvider: Provider;

  constructor(private providerService: ProviderService) {
    this.currentProvider = this.providerService.createMockProvider();
  }

  ngOnInit(): void {
  }

}
