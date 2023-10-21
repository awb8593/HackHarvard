import { Patient } from "./patient.model";

export class PatientAlert {
    priority: number;
    patient: Patient;
    notes: String;

    constructor(priority: number, patient: Patient, notes: String) {
        this.priority = priority;
        this.patient = patient;
        this.notes = notes;
    }
    
}