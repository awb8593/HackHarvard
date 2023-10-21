import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TerraService {
  getProviders(): Map<string, string> {
    return this.getProviders();
  }

  constructor(private http: HttpClient) {
    // Importing the API and instantiating the client using your keys
    const { default: Terra } = require("terra-api");

    const API_KEY = "CtwKGbPKmZHkr1wAX4uFfriWK1ZGhP4c"
    const DEV_ID = "harvardhack-testing-bvgOmUYqpi"
    const SECRET = ""


    const terra = new Terra(DEV_ID, API_KEY, SECRET);

  }
  private terraUrl = 'api/heroes'; 

  getTerra(): Observable<TerraService> {
    return this.http.get<TerraService>(this.terraUrl)
    .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<TerraService>('getTerra', )));

  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  
}
