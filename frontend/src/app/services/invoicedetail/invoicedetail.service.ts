import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GenericoService } from '../generico.service';
import { InvoiceDetail } from 'src/app/interfaces/invoicedetail';

@Injectable({
  providedIn: 'root'
})
export class InvoicedetailService {

  constructor(private apiService: GenericoService) { }

  private apiUrl = '/';

 
  getInvoiceDetail(id: number): Observable<any> {
   
    return this.apiService.get<any>(this.apiUrl + 'invoicesiDetails?id=' + id)
      .pipe(
        tap(response => console.log(response))
      );
}




}
