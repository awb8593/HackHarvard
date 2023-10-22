import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../models/provider.model';
import { Patient } from '../models/patient.model';
import { ProviderService } from '../provider.service';
import { RootService } from '../root/root.service';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit {

  currentProvider: Provider;
  selectedPatientId: number = 0;
  selectedTopic: string = "Select a Topic";
  otherNotes: string = "";

  constructor(private router: Router, private providerService: ProviderService, private rootService: RootService) {
    this.currentProvider = new Provider(0, '', 0, '', [], []);
  }

  async loadProviderData() {
    try {
      this.currentProvider = await this.providerService.createMockProvider();
    } catch (error) {
      console.error('Error while fetching provider:', error);
    }
  }

  // TODO change recipient to be dynamic
  onSend() {
    const request = {
      body: "From: " + this.currentProvider.name + ", Topic: " + this.selectedTopic + ", Message: " + this.otherNotes,
      from: '+18559052854',
      to: '+15857481591'
    };
    console.log('Sending POST request:', request)
    // Send a POST request with the request body
    this.rootService.notifyPatient(request).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateSelectedTopic(event: any) {
    this.selectedTopic = event.target.value;
  }

  searchResults(value: string) {
    return;
  }

  ngOnInit(): void {
    this.loadProviderData();
  }
}
