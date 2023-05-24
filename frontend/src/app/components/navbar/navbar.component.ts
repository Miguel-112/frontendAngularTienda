import { Component } from '@angular/core';
import { ShoppingcartService } from 'src/app/services/shoppingcart/shoppingcart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private shoppingCartService:ShoppingcartService){

  }
  


  cartItems: any[] = [];
  cartItemCount: number = 0;

  

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.getmotorcyclepart();
    this.cartItemCount = this.cartItems.length;

    this.shoppingCartService.productAdded.subscribe((product) => {
      this.cartItems.push(product);
      this.cartItemCount = this.cartItems.length;
    });
    this.shoppingCartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
    
  }


  



 





}
