import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAPIData(){
    return this.http.get(`${this.serverUrl}/getData`);
  }
}
