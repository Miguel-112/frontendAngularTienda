import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';

import { ProviderService } from 'src/app/services/provider/provider.service';
import { Provider } from 'src/app/interfaces/provider';

import { MarcaService } from 'src/app/services/marca/marca.service';
import { Marca } from 'src/app/interfaces/marca';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';
import { MotorcyclePartService } from 'src/app/services/motorcyclepart/motorcycle-part.service';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-motorcyclepartedit',
  templateUrl: './motorcyclepartedit.component.html',
  styleUrls: ['./motorcyclepartedit.component.css']
})
export class MotorcycleparteditComponent {


  page = 1;
  perPage = 5;
  totalpage!:number;
  // motorcycleparts: MotorcyclePart[] = [];
  motorcycleparts: MotorcyclePartWithRelations[]=[];

  totalPages: number[] = [];
  searchTerm = ''

  @Output() cerrar = new EventEmitter();
  @Input() motorcyclepart!: MotorcyclePartWithRelations;
  @Output() updated = new EventEmitter<boolean>();

  providers: Provider[] = [];
  marcas: Marca[] = [];
  categories: Category[] = [];
  selectedCategory: number | undefined;
  successMessage = ''


  @Output() onUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  // errorMsg = ''

  errorMsg: any = {};
 

  public imageSrc: SafeUrl = this.motorcyclepart?.image ?
  this.sanitizer.bypassSecurityTrustUrl('http://127.0.0.1:8000/storage/images/'+ this.motorcyclepart?.image) : '';







  motorcyclePart: MotorcyclePart = new MotorcyclePart(
    0, '', 0, '', 0, 0, '', 0, 0, 0, '', 0
  );


  constructor(private motorcyclepartt: MotorcyclePartService,
     private fb: FormBuilder, private categoriService: CategoriesService,
      private providerService: ProviderService, private marcaService: MarcaService,
      private sanitizer: DomSanitizer) { }


  form!: FormGroup;

  ngOnInit(): void {

    if (this.motorcyclepart?.image) {
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl('http://127.0.0.1:8000/storage/images/' + this.motorcyclepart.image);
    }
   

     this.form = this.fb.group({
      name: new FormControl(this.motorcyclepart.name, Validators.required),
      category_id: new FormControl(this.motorcyclepart.category.id, Validators.required),
      provider_id: new FormControl(this.motorcyclepart.provider.id, Validators.required),
      brand_id: new FormControl(this.motorcyclepart.brand.id, Validators.required),
      purchase_price: new FormControl(this.motorcyclepart.purchase_price, Validators.required),
      sale_price: new FormControl(this.motorcyclepart.sale_price, Validators.required),
      quantity: new FormControl(this.motorcyclepart.quantity, Validators.required),
      image: new FormControl(this.motorcyclepart.image, [Validators.required, Validators.pattern('^.*\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$')]),
      iva: new FormControl(this.motorcyclepart.iva, Validators.required),
    });

    this.form.get('purchase_price')?.valueChanges.subscribe(purchase_price => {

      const iva = this.form.get('iva')?.value;
      const sale_price = this.motorcyclePart.calculateSalePrice(purchase_price, iva);
      this.form.patchValue({ sale_price });
    });



    this.form.get('iva')?.valueChanges.subscribe(iva => {
      const purchase_price = this.form.get('purchase_price')?.value;
      const sale_price = this.motorcyclePart.calculateSalePrice(purchase_price, iva);
      this.form.patchValue({ sale_price });
    });



    this.getCategories();
    this.getProviders();
    this.getMarca();
    this.getMotorcycleParts();



  }


  onSubmit() {
    
    /* console.log(this.form.value); */

  } 


  getMotorcycleParts(): void {

    console.log(this.searchTerm);

      this.motorcyclepartt.getMotorcycleParts(this.page,this.perPage,0,0,this.searchTerm).subscribe(response => {
        this.motorcycleparts = response.data;
        console.log(response.data);
        this.totalPages = [];
        for (let i = 1; i <= response.last_page; i++) {
          this.totalPages.push(i);
          this.totalpage=i;
        }
      });
    }




  getProviders(): void {
    
    this.providerService.getProvider().subscribe(response => {
      this.providers = response.provider;


    });
  }

  getMarca(): void {
    this.marcaService.getMarca().subscribe(response => {
      this.marcas = response.marca;


    });
  }


  getCategories(): void {

    this.categoriService.getCategories().subscribe(response => {
      this.categories = response.categories;

    });
  }





  cerrarFormularioedit() {
    this.cerrar.emit();
    this.getMotorcycleParts();
  }


  

 

  onFileSelected() {

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) {
        const allowedTypes = [ 'image/jpeg'];

        if (allowedTypes.indexOf(file.type) === -1) {
          alert('Solo se permiten imágenes  JPEG ');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.form.get('image')?.setValue(event.target.result);
          this.imageSrc = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  }

  onSubmitt() {
    // Actualizar datos
    // ...

    // Emitir evento
    this.onUpdated.emit(true);
  }
  
  onEdit(id: number) {
    const data = {
      name: this.form.get('name')!.value,
      category_id: this.form.get('category_id')!.value,
      provider_id: this.form.get('provider_id')!.value,
      brand_id: this.form.get('brand_id')!.value,
      purchase_price: this.form.get('purchase_price')!.value,
      sale_price: this.form.get('sale_price')!.value,
      quantity: this.form.get('quantity')!.value,
      iva: this.form.get('iva')!.value,
      image: this.form.get('image')!.value
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    
    this.motorcyclepartt.updateMotorcycleParts(id, data).subscribe(
      (response) => {
        console.log('Repuesto actualizado con éxito', response);
        this.successMessage = 'Repuesto actualizado con éxito';
        
        this.onUpdated.emit(true);
        this.updated.emit(true);
        
      },
      (error) => {
        console.log('Error al actualizar el repuesto', error);
        this.errorMsg = error.error.errors;
      }
    );
  }



  // ...

 
  

}
