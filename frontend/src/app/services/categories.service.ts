import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';


import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private apiService: GenericoService,) { }

  private apiUrl = '/';


  login(email: string, password: string): Observable<any> {
    return this.apiService.post(this.apiUrl + 'login', { email, password });
  }

 
    getCategories(): Observable<{ categories: Category[] }> {
   
    return this.apiService.get<{ categories: Category[] }>(this.apiUrl + 'categories');

    }


    createCategory(categoria: Category): Observable<{ categorías: Category[] }> {
      return this.apiService.post(this.apiUrl + 'categories', { name: categoria.name, description: categoria.description });
    }




    deleteCategory(id : number): Observable<{ categorías: Category[] }> {
      return this.apiService.delete(this.apiUrl + 'categories', id);
    }



    updateCategory(id: number, categoria: Category): Observable<{ category: Category }> {
      const url = `${this.apiUrl}categories/${id}`;
      const body = { category: categoria };


      console.log(url);

      return this.apiService.put(url,  { name: categoria.name, description: categoria.description });
    }


}
