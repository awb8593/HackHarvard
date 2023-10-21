import { User } from "./user.model";
import { Patient } from "./patient.model";
import { PatientAlert } from "./patient-alert.model";

export class Provider implements User {
    id: number;
    name: String;
    phoneNumber: number;
    field: String;
    patients: Array<Patient>;
    patientAlerts: Array<PatientAlert>;

    constructor(id: number, name: String, phoneNumber: number, field: String, patients: Array<Patient>, patientAlerts: Array<PatientAlert>) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.field = field;
        this.patients = patients;
        this.patientAlerts = patientAlerts;
    }
    
}