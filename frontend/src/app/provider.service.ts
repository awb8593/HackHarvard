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

    const patient1 = new Patient(1, "Onvida", 5857481591, new Array<Provider>)
    const patient2 = new Patient(7, "Diego", 5857481591, new Array<Provider>)
    const patient3 = new Patient(10, "Kasim", 5857481591, new Array<Provider>)
    const patientAlert1 = await this.patientService.createMockPatientAlert(patient1);
    const patientAlert2 = await this.patientService.createMockPatientAlert(patient2);
    const patientAlert3 = await this.patientService.createMockPatientAlert(patient3);


    return new Provider(
      1, 
      "Dr. Burgos",
      5857481591,
      "Psychologist",
      new Array<Patient>(
        patient1, patient2, patient3
      ),
      new Array<PatientAlert>(
        patientAlert1,
        patientAlert2,
        patientAlert3
      )
    )
  }
}
