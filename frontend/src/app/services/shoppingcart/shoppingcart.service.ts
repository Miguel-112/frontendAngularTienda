
import { Injectable, EventEmitter } from '@angular/core'
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';
import { CartMotorcyclePart } from 'src/app/interfaces/cartMotorcyclepart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private products: MotorcyclePartWithRelations[] = [];
  public productAdded = new EventEmitter<MotorcyclePartWithRelations>();

  constructor() { 
    const cart = localStorage.getItem('shopping-cart');
    if (cart !== null) {
      this.products = JSON.parse(cart);
    }
  }

  public addmotorcyclepart(product: CartMotorcyclePart): void {

    //this.products.push(product);
    localStorage.setItem('shopping-cart', JSON.stringify(this.products));

    this.productAdded.emit(product);
  }







  public getmotorcyclepart(): any[] {
    return this.products;
  }

  public removemotorcyclepart(index: number): void {
    this.products.splice(index, 1);
    localStorage.setItem('shopping-cart', JSON.stringify(this.products));
  } 

  public isProductAddedToCart(product: MotorcyclePartWithRelations): boolean {
    return this.products.some((p: MotorcyclePartWithRelations) => p.id === product.id);
  }
  

  
}
