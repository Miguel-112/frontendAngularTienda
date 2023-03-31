import { Injectable } from '@angular/core';

import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/';

  constructor(private apiService: GenericoService, ) { }

  login(email: string, password: string): Observable<any> {
    return this.apiService.post(this.apiUrl + 'login', { email, password });
  }

  logout(): Observable<any> {
    return this.apiService.post(this.apiUrl + 'logout', {});
  }

  getUser(): Observable<any> {
    return this.apiService.get(this.apiUrl + 'user');
  }

  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }


}
