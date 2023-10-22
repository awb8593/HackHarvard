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

  getPatientAlert() {
    return this.getAPIData('diagnosis');
  }
}
