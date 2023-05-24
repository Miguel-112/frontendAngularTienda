import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShoppingcartService } from 'src/app/services/shoppingcart/shoppingcart.service';
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';
import { CartMotorcyclePart } from 'src/app/interfaces/cartMotorcyclepart';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/interfaces/client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent {
  constructor(
    private shoppingCartService: ShoppingcartService,private route: ActivatedRoute,

    private cd: ChangeDetectorRef, private clientservice: ClientService,private fb: FormBuilder // import ChangeDetectorRef
  ) {}

  public motorcyclepart: CartMotorcyclePart[] = [];
  cartItemCount = 0;
  sum = 'sum';
  rest = 'rest';
  total_sale = 0;
  sale = 0;
  client: Client[] = [];
  filteredClient: Client[]=[];
  clientForm!: FormGroup;
  ngOnInit(): void {
   
    this.createForm();
    this.route.queryParams.subscribe(params => {
     
      this.shoppingCartService.getmotorcyclepart();
      this.motorcyclepart = this.shoppingCartService.getmotorcyclepart();
      this.cartItemCount = this.motorcyclepart.length;
      console.log(this.motorcyclepart);
      this.TotaSales();
      this.shoppingCartService.getmotorcyclepart();
      this.getClient();
    
     
    });
  }

  createForm() {
    this.clientForm = this.fb.group({
      client_id: ['', [Validators.required,]],
      
    });
  }


  onSubmit() {}


 /*  public TotaSales() {
    this.total_sale = 0; // Reinicia el valor total_sale
    this.motorcyclepart.forEach((element) => {
      this.sale = element.saleprice_total;
      this.total_sale += this.sale;
    });
    this.cd.detectChanges(); // Detecta los cambios y actualiza la vista
  } */
  public removeProduct(index: number): void {
    this.shoppingCartService.removemotorcyclepart(index);
    this.motorcyclepart = this.shoppingCartService.getmotorcyclepart();
    this.cartItemCount = this.motorcyclepart.length;
    this.cartItemCount = this.motorcyclepart.length;
    this.shoppingCartService.updateCartItemCount(this.cartItemCount);
    this.ngOnInit();
  }


 
  public cantidadnumber(index: number, ations: any): void {
    let product = this.motorcyclepart[index] as CartMotorcyclePart;

    if (product && product.cantidad == undefined) {
      product.cantidad = 0;
      product.saleprice_total = product.sale_price;
    }

    if (product && product.cantidad !== undefined) {
      if (ations == 'sum') {
        product.cantidad += 1;
        product.saleprice_total = product.sale_price * product.cantidad;
      }

      if (ations == 'rest') {
        if (product.cantidad > 0) {
          product.cantidad -= 1;
          product.saleprice_total = product.sale_price * product.cantidad;
        }
      }
    }
    this.TotaSales(); // Llama a TotaSales() después de actualizar la cantidad
  }


  public TotaSales() {
    this.total_sale = 0; // Reinicia el valor total_sale
    this.motorcyclepart.forEach((element) => {
      this.sale = element.saleprice_total;
      this.total_sale += this.sale;
    });
    this.cd.detectChanges(); // Detecta los cambios y actualiza la vista
  }

  getClient(): void {
    this.clientservice.getClient().subscribe(response => {
      this.client = response.client;
      this.filteredClient = this.client;
      console.log("============================================================");
      console.log(this.client);
      console.log("============================================================");
      
    });
  }




}










