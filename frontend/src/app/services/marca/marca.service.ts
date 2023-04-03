
import { Injectable } from '@angular/core';

import { GenericoService } from '../generico.service';

import { Marca } from 'src/app/interfaces/marca';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private apiService: GenericoService,) { }

  private apiUrl = '/';

    getMarca(): Observable<{ marca: Marca[] }> {
   
      return this.apiService.get<{ marca: Marca[] }>(this.apiUrl + 'marca');
  
      }


    createMarca(categoria: Marca): Observable<{ categorías:Marca[] }> {
      return this.apiService.post(this.apiUrl + 'marca', { name: categoria.name, email: categoria.description });
    }




    deleteMarca(id : number): Observable<{ marca: Marca[] }> {
      return this.apiService.delete(this.apiUrl + 'marca', id);
    }



    updateMarca(id: number, categoria: Marca): Observable<{ marca: Marca }> {
      const url = `${this.apiUrl}marca/${id}`;
      const body = { marca: categoria };


      console.log(url);

      return this.apiService.put(url,  { name: categoria.name, description: categoria.description });
    }

}
