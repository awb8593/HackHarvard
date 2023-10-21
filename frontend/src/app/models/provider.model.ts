import { User } from "./user.model";
import { Patient } from "./patient.model";

export class Provider implements User {
    id: number;
    name: String;
    phoneNumber: number;
    field: String;
    patients: Array<Patient>;

    constructor(id: number, name: String, phoneNumber: number, field: String, patients: Array<Patient>) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.field = field;
        this.patients = patients;
    }
    
}