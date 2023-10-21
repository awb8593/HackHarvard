import { Injectable } from '@angular/core';
import { Provider } from './models/provider.model';
import { Patient } from './models/patient.model';
import { PatientAlert } from './models/patient-alert.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor() {}

  createMockProvider() {
    
    return new Provider(
      1, 
      "Adrian",
      5857481591,
      "Psychologist",
      new Array<Patient>(
        new Patient(1, "Onvida", 5857481591, new Array<Provider>),
        new Patient(2, "Diego", 5857481591, new Array<Provider>),
        new Patient(3, "Kasim", 5857481591, new Array<Provider>)
      ),
      new Array<PatientAlert>(
        new PatientAlert(1, new Patient(1, "Onvida", 5857481591, new Array<Provider>), "ALERT! Quite healthy")
      )
    )
  }
}
