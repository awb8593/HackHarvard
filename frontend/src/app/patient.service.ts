import { Injectable } from '@angular/core';
import { RootService } from './root/root.service';
import { PatientAlert } from './models/patient-alert.model';
import { Patient } from './models/patient.model';
import { Provider } from './models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private rootService: RootService) {}

  createMockPatient(name: string, id: number): Promise<Patient> {
    return new Promise((resolve, reject) => {
      this.rootService.getPatientAlert().subscribe(
        (data: any) => {
          console.log("THE API HAS RETURNED:", data);
          const patient = new Patient(id, name, 5857481591, new Array<Provider>());
          resolve(patient);
        },
        (error: any) => {
          console.error("Error while fetching data:", error);
          reject(error);
        }
      );
    });
  }
  

}
