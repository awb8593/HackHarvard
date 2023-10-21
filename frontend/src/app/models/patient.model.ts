import { Provider } from "./provider.model";
import { User } from "./user.model";
import { provideRouter } from "@angular/router";

export class Patient implements User {
    id: number;
    name: String;
    phoneNumber: number;
    providers: Array<Provider>;

    constructor(id: number, name: String, phoneNumber: number, providers: Array<Provider>) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.providers = providers;
    }
    
}