import { Injectable } from '@angular/core';
import { GenericoService } from '../generico.service';
import { Observable } from 'rxjs';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';



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


  getMotorcycleParts(page: number, perPage: number, category: number, brand: number, searchTerm: string): Observable<{ data: MotorcyclePartWithRelations[], current_page: number, last_page: number }> {
    const url = `${this.apiUrl}motorcyclepart?page=${page}&perPage=${perPage}&category=${category}&brand=${brand}&searchTerm=${searchTerm}`;
        
    return this.apiService.get<{ data: MotorcyclePartWithRelations[], current_page: number, last_page: number }>(url);
  }
  



   createMotorcycleParts(formData: FormData): Observable<any> {

    console.log(formData.get('image'));

    return this.apiService.post(this.apiUrl + 'motorcyclepart', formData);
  } 


 /*  updateMotorcycleParts(id: number,formData: FormData): Observable<any> {

   

    console.log(formData.get('image'));

    return this.apiService.put(`${this.apiUrl}motorcyclepart/${id}`, formData);

   
  } 
 
 */


  updateMotorcycleParts(id: number, data: any): Observable<any> {
    console.log("==================================");
    console.log(data);

    console.log("==================================");
    const url = `${this.apiUrl}motorcyclepart/${id}`
    return this.apiService.put(url, data);
  }


  deleteMotorcycleParts(id : number): Observable<{ categorías: MotorcyclePart[] }> {

    return this.apiService.delete(this.apiUrl + 'motorcyclepart', id);
  }
  



  
    



  


}
