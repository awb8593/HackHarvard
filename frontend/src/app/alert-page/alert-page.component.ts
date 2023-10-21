import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../models/provider.model';
import { Patient } from '../models/patient.model';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit {

  currentProvider: Provider;
  selectedPatientId: number = 0;
  selectedTopic: string = "Select a Topic";

  constructor(private router: Router, private providerService: ProviderService) {
    this.currentProvider = this.providerService.createMockProvider();
  }

  updateSelectedTopic(event: any) {
    this.selectedTopic = event.target.value;
  }

  ngOnInit(): void {
  }
}
