import { Injectable } from '@angular/core';
import { GenericoService } from '../generico.service';
import { Observable } from 'rxjs';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface MotorcyclePartResponse {
  motorcycleparts: MotorcyclePart[];
  totalItems: number;
}


@Injectable({
  providedIn: 'root'
})
export class MotorcyclePartService {

  constructor(private apiService: GenericoService) { }

  private apiUrl = '/';




  /*  getMotorcycleParts(): Observable<{ motorcyclepart: MotorcyclePart[] }> {
   
    return this.apiService.get<{  motorcyclepart: MotorcyclePart[] }>(this.apiUrl + 'motorcyclepart');

    }   */


    getMotorcycleParts(page: number, perPage: number,category: number,brand: number, searchTerm:string): Observable<{ data: MotorcyclePart[], current_page: number, last_page: number }> {
      const url = `${this.apiUrl}motorcyclepart?page=${page}&perPage=${perPage}&category=${category}&brand=${brand}&searchTerm=${searchTerm}`;
      return this.apiService.get<{ data: MotorcyclePart[], current_page: number, last_page: number }>(url);
  }
  

    //private apiUrl = 'http://localhost:8000/api/motorcycleparts';

    
  
   

     
 


   




   
    



  


}
