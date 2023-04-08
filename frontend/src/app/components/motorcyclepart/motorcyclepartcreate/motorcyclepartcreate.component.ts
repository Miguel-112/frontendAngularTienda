
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';

import { ProviderService } from 'src/app/services/provider/provider.service';
import { Provider } from 'src/app/interfaces/provider';

import { MarcaService } from 'src/app/services/marca/marca.service';
import { Marca } from 'src/app/interfaces/marca';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';





@Component({
  selector: 'app-motorcyclepartcreate',
  templateUrl: './motorcyclepartcreate.component.html',
  styleUrls: ['./motorcyclepartcreate.component.css']
})
export class MotorcyclepartcreateComponent {

  categories: Category[] = [];
 
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  providers: Provider[] = [];

  marcas: Marca[] = [];

  @Output() cerrar = new EventEmitter();

  cerrarFormulario() {
    this.cerrar.emit();
  }

  motorcyclePart: MotorcyclePart = new MotorcyclePart(
    0, '', 0, '', 0, 0, '', 0, 0, 0, '', 0
  );
  

  

  constructor(private fb: FormBuilder, private categoriService: CategoriesService,private providerService: ProviderService,private marcaService: MarcaService) {
    
  }
  

  

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      category: ['', Validators.required],
      provider: ['', Validators.required],
      brand: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)]],
      iva: ['', Validators.required],
    });


   

    
    this.form.get('purchasePrice')?.valueChanges.subscribe(purchasePrice => {

      const iva = this.form.get('iva')?.value;
      const salePrice = this.motorcyclePart.calculateSalePrice(purchasePrice, iva);
      this.form.patchValue({ salePrice });
    });


    
    this.form.get('iva')?.valueChanges.subscribe(iva => {
      const purchasePrice = this.form.get('purchasePrice')?.value;
      const salePrice = this.motorcyclePart.calculateSalePrice(purchasePrice, iva);
      this.form.patchValue({ salePrice });
    });

    

     this.getCategories();
     this.getProviders();
     this.getMarca();
     

   
  }

   getCategories(): void {

    this.categoriService.getCategories().subscribe(response => {
      this.categories = response.categories;
      
    });
  } 


  onSubmit(): void {
    if (this.form.valid) {
      // Enviar datos al servidor
    }
  }


  getProviders(): void {
    this.providerService.getProvider().subscribe(response => {
      this.providers = response.provider;
     
      
    });
  }

  getMarca(): void {
    this. marcaService.getMarca().subscribe(response => {
      this.marcas = response.marca;
      
      
    });
  }

 
  


}
