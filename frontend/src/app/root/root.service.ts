import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAPIData( endpoint: string){
    return this.http.get(`${this.serverUrl}/${endpoint}`);
  }

  getTest() {
    return this.getAPIData('getData')
  }

  getPatientAlert() {
    return this.getAPIData('diagnosis');
  }
}
