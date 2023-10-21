import { Component, Input, OnInit } from '@angular/core';
import { PatientAlert } from '../models/patient-alert.model';
import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.css']
})
export class AlertTableComponent implements OnInit {
  
  @Input() public provider?: Provider;
  public patientAlerts: Array<PatientAlert> = [];
  public columns: Array<any> = [
    { title: 'Priority', name: 'priority' },
    { title: 'Patient', name: 'patient' },
    { title: 'Notes', name: 'notes' }
  ]
  
  constructor() {
    if(this.provider){
      this.patientAlerts = this.provider.patientAlerts;
    }
  }

  ngOnInit(): void {
    /*
    this.patientAlerts = [
      { priority: 5, patient: 'Onvida', notes: 'Patient is showing troubling signs.'},
      { priority: 2, patient: 'Kasim', notes: 'He is so healthy'}
    ]
    */
  }

}
