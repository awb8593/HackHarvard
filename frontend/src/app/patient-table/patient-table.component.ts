import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {
  @Input() patients?: Array<Patient>;
  // patients = [
  //   { priority: 5, patient: 'Peter', notes: 'These are notes' },
  //   // Add more patients as needed
  // ];
  constructor() { }

  ngOnInit(): void {
  }

}
