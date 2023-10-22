import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Send a POST request with a request body
  notifyPatient(data: any) {
    // Define the URL and the request body
    const url = `${this.serverUrl}/sms`;
    const requestBody = data; // Your request body data

    // Make the POST request
    return this.http.post(url, requestBody);
  }

  getAPIData( endpoint: string){
    return this.http.get(`${this.serverUrl}/${endpoint}`);
  }

  getTest() {
    return this.getAPIData('getData')
  }

  goToWearables() {
    let url = this.getAPIData('getUserDataDaily');
    return url;
    // window.open(url);
  }

  getDaily() {
    return this.getAPIData('getUserDataDaily')
  }

  getBody() {
    return this.getAPIData('getUserDataBody')
  }

  getAthlete() {
    return this.getAPIData('getUserDataAthlete')
  }

  getNutrition() {
    return this.getAPIData('getUserDataNutrition')
  }

  getMenstruation() {
    return this.getAPIData('getUserDataMenstruation')
  }
  
  getSleep() {
    return this.getAPIData('getUserDataSleep')
  }

  getActivity() {
    return this.getAPIData('getUserDataActivity')
  }

  getPatientAlert() {
    return this.getAPIData('diagnosis');
  }
}
