import { Category } from "../interfaces/category";
import { Marca } from "../interfaces/marca";

import { Provider } from "../interfaces/provider";



export class MotorcyclePart {
    id: number;
    name: string;
    category_id: number;
     category_name: string;
    provider_id: number;
    brand_id: number;
     brand_name: string;
    purchase_price: number;
    sale_price: number;
    quantity: number;
    image: string;
    iva: number;
    brand!: Marca; // <-- relación con Brand
    category!: Category; // <-- relación con Category
    provider!: Provider; // <-- relación con Provider
  
    constructor(
      id: number,
      name: string,
      category_id: number,
       category_name: string,
      provider_id: number,
      brand_id: number,
       brand_name: string,
      purchase_price: number,
      sale_price: number,
      quantity: number,
      image: string,
      iva: number
    ) {
      this.id = id;
      this.name = name;
      this.category_id = category_id;
       this.category_name = category_name;
      this.provider_id = provider_id;
      this.brand_id = brand_id;
      this.brand_name = brand_name;
      this.purchase_price = purchase_price;
      this.sale_price = sale_price;
      this.quantity = quantity;
      this.image = image;
      this.iva = iva;
    }
  

    calculateSalePrice(purchasePrice: number, iva: number): number {
      return purchasePrice + (purchasePrice * iva);
    }
  }
  