import { Injectable } from '@angular/core';
import { GenericoService } from '../generico.service';
import { CartMotorcyclePart } from 'src/app/interfaces/cartMotorcyclepart';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/interfaces/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService: GenericoService) { }

  private apiUrl = '/';


  // getInvoices(page: number, perPage: number, startDate: Date, endDate: Date, searchTerm: string): Observable<{ data: Invoice, current_page: number, last_page: number }> {
  //   const url = `${this.apiUrl}invoices?page=${page}&perPage=${perPage}&category=${startDate}&brand=${endDate}&searchTerm=${searchTerm}`;
        
  //   return this.apiService.get<{ data: Invoice, current_page: number, last_page: number }>(url);
  // }

  getInvoices(page: number, perPage: number, startDate: string, endDate: string, searchTerm: string): Observable<{ data: Invoice[], current_page: number, last_page: number }> {
    const url = `${this.apiUrl}invoices?page=${page}&perPage=${perPage}&startDate=${startDate}&endDate=${endDate}&searchTerm=${searchTerm}`;
        
    return this.apiService.get<{ data: Invoice[], current_page: number, last_page: number }>(url);
}

}
