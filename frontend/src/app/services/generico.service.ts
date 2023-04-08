import { Injectable } from '@angular/core';

import { Category } from '../interfaces/category';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MotorcyclePart } from '../class/motorcyclepart';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GenericoService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrll = 'http://localhost:8000/api/motorcycleparts';

  constructor(private http: HttpClient) { }


  private token() {
    var token = localStorage.getItem('token') || '';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpOptions;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde..');
  }

  get<T>(path: string): Observable<T> {
    console.log(this.http.get<T>(this.apiUrl + path, this.token()));
    return this.http.get<T>(this.apiUrl + path, this.token())
     ;
  } 



  




  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + path, body, this.token())
     ;
  }

  put<T>(path: string, body: any): Observable<T> {
    
    return this.http.put<T>(this.apiUrl + path, body, this.token())
      ;
  }

  

  delete<T>(path: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}/${id}`, this.token());
  }



  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }






  
}
