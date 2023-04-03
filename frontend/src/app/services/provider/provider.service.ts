import { Injectable } from '@angular/core';

import { GenericoService } from '../generico.service';

import { Observable } from 'rxjs';

import { Provider } from 'src/app/interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private apiService: GenericoService,) { }


  private apiUrl = '/';

 
    getProvider(): Observable<{ provider: Provider[] }> {

      
       return this.apiService.get<{ provider: Provider[] }>(this.apiUrl + 'provider');

    }


  

  


    createProvider(provider: Provider): Observable<{ provider: Provider[] }> {
      return this.apiService.post(this.apiUrl + 'provider', { name: provider.name, email: provider.email,tel: provider.tel,address: provider.address });
    }




     deleteProvider(id : number): Observable<{ categorías: Provider[] }> {
       return this.apiService.delete(this.apiUrl + 'provider', id);
     }



      updateProvider(id: number, provider: Provider): Observable<{ provider: Provider }> {
       const url = `${this.apiUrl}provider/${id}`;
       const body = { provider: provider };


       return this.apiService.put(url,  {name: provider.name, email: provider.email,tel: provider.tel,address: provider.address});
     }


     


   

}
