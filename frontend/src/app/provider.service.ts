import { Injectable } from '@angular/core';
import { Provider } from './models/provider.model';
import { Patient } from './models/patient.model';
import { PatientAlert } from './models/patient-alert.model';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private patientService: PatientService) {}

  async createMockProvider() {

    const patient1 = await this.patientService.createMockPatient("Onvida Serixay", 1);
    const patient2 = await this.patientService.createMockPatient("Kasim", 5);
    const patient3 = await this.patientService.createMockPatient("Diego", 10);

    return new Provider(
      1, 
      "Dr. Burgos",
      5857481591,
      "Psychologist",
      new Array<Patient>(
        patient1, patient2, patient3
      ),
      new Array<PatientAlert>(
        new PatientAlert(5, new Patient(1, "Onvida", 5857481591, new Array<Provider>), "ALERT! Immediate attention may be needed!"),
        new PatientAlert(2, new Patient(7, "Diego", 5857481591, new Array<Provider>), "Starting to show minor symptoms."),
        new PatientAlert(1, new Patient(10, "Kasim", 5857481591, new Array<Provider>), "Healthiest guy I've ever seen")
      )
    )
  }
}
