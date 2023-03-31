import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde..');
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + path, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + path, body, { headers: this.getHeaders() })
     ;
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + path, body, { headers: this.getHeaders() })
      ;
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + path, { headers: this.getHeaders() })
     ;
  }

  
}
