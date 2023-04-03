import { Injectable } from '@angular/core';

import { GenericoService } from '../generico.service';

import { Client } from 'src/app/interfaces/client';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiService: GenericoService,) { }


  private apiUrl = '/';

 
    getClient(): Observable<{ client: Client[] }> {

      
       return this.apiService.get<{ client: Client[] }>(this.apiUrl + 'client');

    }


  

  


    createClient(client: Client): Observable<{client: Client[] }> {
      return this.apiService.post(this.apiUrl + 'client', { name: client.name, email: client.email,tel: client.tel,address: client.address });
    }




     deleteClient(id : number): Observable<{ client: Client[] }> {
       return this.apiService.delete(this.apiUrl + 'client', id);
     }



      updateClient(id: number, client: Client): Observable<{client: Client }> {
       const url = `${this.apiUrl}client/${id}`;
       const body = { client: client };


       return this.apiService.put(url,  {name: client.name, email: client.email,tel: client.tel,address: client.address});
     }


     

}
