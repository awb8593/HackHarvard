import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.css']
})
export class AlertTableComponent implements OnInit {
  
  currentProvider: Provider;

  constructor(private providerService: ProviderService) {
    this.currentProvider = new Provider(0, '', 0, '', [], []);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.currentProvider = await this.providerService.createMockProvider();
    } catch (error) {
      console.error('Error while fetching provider:', error);
    }
  }
}
