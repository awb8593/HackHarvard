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

  createMockPatient(name: string, id: number): Patient {
    return new Patient(id, name, 5857481591, new Array<Provider>());

  }
  
  createMockPatientAlert(patient: Patient): Promise<PatientAlert> {
    return new Promise((resolve, reject) => {
      this.rootService.getPatientAlert().subscribe(
        (data: any) => {
          console.log("THE API HAS RETURNED:", data);
          const alertContent = JSON.parse(data[0].message.content);

          const alert = new PatientAlert(alertContent.priority, patient, alertContent.detailedNotes + alertContent.assessment + alertContent.actionItems + alertContent.followUp);
          resolve(alert);
        },
        (error: any) => {
          console.error("Error while fetching data:", error);
          reject(error);
        }
      );
    });
  }
  

}
