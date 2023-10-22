import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {
  patients = [
    { priority: 5, patient: 'Peter', notes: 'These are notes' },
    // Add more patients as needed
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
