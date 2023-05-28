
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';
import { CartMotorcyclePart } from 'src/app/interfaces/cartMotorcyclepart';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericoService } from '../generico.service';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private products: MotorcyclePartWithRelations[] = [];
  public productAdded = new EventEmitter<MotorcyclePartWithRelations>();

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();
  private apiUrl = '/';
   public motorcyclepart: CartMotorcyclePart[] = [];

  updateCartItemCount(count: number) {
    this.cartItemCount.next(count);
  }

  constructor(private apiService: GenericoService) { 

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


  // createinvoices(total_sale:number,client_id: number,motorcyclePart: MotorcyclePart[]): Observable<any> {

  //  console.log(total_sale,client_id);

  //  motorcyclePart.forEach(element => {
    
  //  });

  //   return this.apiService.post(this.apiUrl + 'invoices', {
  //     total_sale: total_sale,
  //     client_id: client_id,
  //     motorcyclePart: motorcyclePart
  //   });

  //    return this.apiService.post(this.apiUrl + 'invoices', motorcyclePart);
  // } 

  createinvoices(total_sale: number, client_id: number, motorcyclePart: CartMotorcyclePart[]): Observable<any> {
    console.log(total_sale, client_id);


   

  
    const invoiceDetails = motorcyclePart.map(part => {
      return {
        name: part.name,
        cantidad: part.cantidad,
        iva: part.iva,
        purchase_price: part.purchase_price,
        sale_price: part.sale_price,
        saleprice_total: part.saleprice_total,
        invoice_id: null, // Asegúrate de establecer esto según tus necesidades
        id_motorcycle_parts:part.id, //
        // Agrega los campos adicionales que necesites
        // OtroCampo: part.OtroCampo,
        // OtroCampo2: part.OtroCampo2,
      };
    });
  
    const invoiceData = {
      total_sale: total_sale,
      client_id: client_id,
      invoice_details: invoiceDetails,
    };
  
    return this.apiService.post(this.apiUrl + 'invoices', invoiceData);
  }
  

  

  
}
