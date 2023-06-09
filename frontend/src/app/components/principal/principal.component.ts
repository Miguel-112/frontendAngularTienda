import { Component } from '@angular/core';
import { MotorcyclePartService } from 'src/app/services/motorcyclepart/motorcycle-part.service';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';

import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca/marca.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart/shoppingcart.service';
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';
import { CartMotorcyclePart } from 'src/app/interfaces/cartMotorcyclepart';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {



page = 1;
perPage = 6;
pageRange = 9;
totalpage!:number;
motorcycleparts: CartMotorcyclePart[] = [];
categories: Category[] = [];
filteredCategories: Category[]=[];
marca: Marca[] = [];
filteredMarca: Marca[]=[];
totalMotorcycleParts = 0;
lastPage = 1;
pages: number[] = [];
totalPages: number[] = [];
category: number = 0;
brand: number = 0;
searchTerm=''
addedToCart = false;

addedToCartMap: any = {};





  constructor(private motorcyclepart: MotorcyclePartService, 
       private route: ActivatedRoute,private categoriService:
        CategoriesService,private formBuilder:
         FormBuilder,private marcaService: MarcaService,private shoppingCartService:ShoppingcartService

         
         ){
    this.myForm = this.formBuilder.group({
      category: [''], // valor inicial
      marca: [''] 
    });

  }


 /*  public addToCart(motorcyclepart: MotorcyclePartWithRelations): void {
    this.shoppingCartService.addmotorcyclepart(motorcyclepart);
    this.addedToCart = true;

    
    
  } */

  public addToCart(motorcyclepart: CartMotorcyclePart): void {
    this.shoppingCartService.addmotorcyclepart(motorcyclepart);
    motorcyclepart.addedToCart = true;
  }


  myForm: FormGroup;
  
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.page = +params['page'] || 1; // obtener la página actual de la URL
    this.getMotorcycleParts();
    this.getCategories();
    this.getMarca();
    this.shoppingCartService.getmotorcyclepart();
   
  });

 
}

onCategorySelected(event: Category): void {
 
  if (event) {
    this.category = event.id;
    this.getMotorcycleParts();
  } else {
    this.category = 0; // o el valor que necesites asignar para indicar que la categoría no ha sido seleccionada
  }
  
}

onBrandSelected(event: Marca): void {
 

  if (event) {
    this.brand = event.id;
    this.getMotorcycleParts();
  } else {
    this.brand = 0;
  }
  
}




getMotorcycleParts(): void {
/* 
  console.log(this.category);
  console.log(this.brand); */
  
  this.motorcyclepart.getMotorcycleParts(this.page,this.perPage,this.category,this.brand,'').subscribe(response => {
    this.motorcycleparts = response.data;
    console.log(response.data);
    this.totalPages = [];
    for (let i = 1; i <= response.last_page; i++) {
      this.totalPages.push(i);
      this.totalpage=i;
    }
  });
}

trackByFn(index: number, item: any): number {
  return item.id; 
}



getCategories(): void {
  this.categoriService.getCategories().subscribe(response => {
    this.categories = response.categories;
    this.filteredCategories = this.categories;
    console.log(this.categories);
    
    
  });

 
}


getMarca(): void {

  this. marcaService.getMarca().subscribe(response => {
    this.marca = response.marca;
    console.log(this.marca);
    this. filteredMarca = this.marca;
    
  });
}


filterCategories(): void {

  if (!this.searchTerm) {
    this.filteredCategories = this.categories;
    return;
  }
  this.filteredCategories = this.categories.filter(category => {
    return category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(this.searchTerm.toLowerCase());
          
           
  });
}


filterMarca(): void {

  if (!this.searchTerm) {
    this.filteredMarca = this.marca;
    return;
  }
  this.filteredMarca = this.marca.filter(category => {
    return category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(this.searchTerm.toLowerCase());
          
           
  });
}




getPageRange(page: number, totalPages: number): number[] {
  const pageRange = this.pageRange;
  const pagesToShow = [];

  // Calcular el rango de páginas que se mostrarán en la lista de paginación
  let start = Math.max(page - Math.floor(pageRange / 2), 1);
  let end = Math.min(start + pageRange - 1, totalPages);

  // Ajustar el rango de páginas si se desborda
  const offset = pageRange - (end - start + 1);
  if (offset > 0) {
    start = Math.max(start - offset, 1);
    end = Math.min(start + pageRange - 1, totalPages);
  }

  // Agregar las páginas al arreglo a mostrar
  for (let i = start; i <= end; i++) {
    pagesToShow.push(i);
    
  }

  return pagesToShow;
}

 






}





 


  






