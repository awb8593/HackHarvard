import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../models/provider.model';
import { Patient } from '../models/patient.model';
import { ProviderService } from '../provider.service';
import { RootService } from '../root/root.service';
import { PatientService } from '../patient.service';
import { phoneFrom, phoneTo } from 'authentication.js';


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
  patients: Array<Patient> = [];

  showModal = false;
  modalTitle = 'Add User';
  modalMessage = '...';
  formData = { name: 'name', phoneNumber: 'phone number'};
  constructor(private router: Router, private providerService: ProviderService, private rootService: RootService, private patientService: PatientService) {
    this.patients = [
      new Patient(1, "Onvida", -1, new Array<Provider>),
      new Patient(7, "Diego", -1, new Array<Provider>),
      new Patient(10, "Kasim", -1, new Array<Provider>)
    ]
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
      from: phoneFrom,
      to: phoneTo
    };
    console.log('Sending POST request:', request)
    // Send a POST request with the request body
    this.modalTitle = 'Message';

    this.rootService.notifyPatient(request).subscribe(
      (response) => {
        console.log('Response:', response);
        this.modalMessage = 'Message has been sent successfully!'
      },
      (error) => {
        console.error('Error:', error);
        this.modalMessage = 'Message has failed to send.'
      }
    );

    
    this.openModal();
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

  openModal() {
    this.showModal = true;
  }

  openFormModal() {
    this.showModal = true;
    this.formData = { name: '', phoneNumber: '' };
  }

  closeModal() {
    this.showModal = false;
  }

  addPatient() {
    this.modalMessage = 'Add a User';
    this.modalTitle = 'Add a User';
    this.formData = { name: 'name', phoneNumber: 'phone number'};
    this.openFormModal();
  }

  submitForm(formData: any) {
    // Handle the form data from the form modal
    console.log('Form data submitted:', formData);
    console.log(formData.name);
    this.patients.push(new Patient(this.patients.length, formData.name, formData.phonenumber, [this.currentProvider]));
  }
}
