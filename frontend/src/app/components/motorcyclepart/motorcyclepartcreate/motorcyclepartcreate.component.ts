import { Component, EventEmitter, Output } from '@angular/core';
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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';

@Component({
  selector: 'app-motorcyclepartcreate',
  templateUrl: './motorcyclepartcreate.component.html',
  styleUrls: ['./motorcyclepartcreate.component.css'],
})
export class MotorcyclepartcreateComponent {
  public imageSrc: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
    './assets/img/Global/user.png'
  );

  categories: Category[] = [];

  filteredCategories: Category[] = [];
  searchTerm: string = '';
  providers: Provider[] = [];
  marcas: Marca[] = [];
  successMessage = '';
  // errorMsg = ''

  errorMsg: any = {};

  selectedFile: File | undefined;

  @Output() cerrar = new EventEmitter();

  cerrarFormulario() {
    this.cerrar.emit();
  }

  motorcyclePart: MotorcyclePart = new MotorcyclePart(
    0,
    '',
    0,
    '',
    0,
    0,
    '',
    0,
    0,
    0,
    '',
    0
  );

  constructor(
    private fb: FormBuilder,
    private categoriService: CategoriesService,
    private providerService: ProviderService,
    private marcaService: MarcaService,
    private motorcyclepart: MotorcyclePartService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],
      provider_id: ['', Validators.required],
      brand_id: ['', Validators.required],
      purchase_price: ['', Validators.required],
      sale_price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern('^.*.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$'),
        ],
      ],
      iva: ['', Validators.required],
    });

    this.form
      .get('purchase_price')
      ?.valueChanges.subscribe((purchase_price) => {
        const iva = this.form.get('iva')?.value;
        const sale_price = this.motorcyclePart.calculateSalePrice(
          purchase_price,
          iva
        );
        this.form.patchValue({ sale_price });
      });

    this.form.get('iva')?.valueChanges.subscribe((iva) => {
      const purchase_price = this.form.get('purchase_price')?.value;
      const sale_price = this.motorcyclePart.calculateSalePrice(
        purchase_price,
        iva
      );
      this.form.patchValue({ sale_price });
    });

    this.getCategories();
    this.getProviders();
    this.getMarca();
  }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value);

    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('category_id', this.form.get('category_id')!.value);
    formData.append('provider_id', this.form.get('provider_id')!.value);
    formData.append('brand_id', this.form.get('brand_id')!.value);
    formData.append('purchase_price', this.form.get('purchase_price')!.value);
    formData.append('sale_price', this.form.get('sale_price')!.value);
    formData.append('quantity', this.form.get('quantity')!.value);
    formData.append('iva', this.form.get('iva')!.value);
    formData.append('image', this.form.get('image')!.value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };

    this.motorcyclepart.createMotorcycleParts(formData).subscribe(
      (response) => {
        this.form.reset();
        console.log('Repuesto creado con éxito', response);
        this.successMessage = 'Repuesto creado con éxito';

        this.router
          .navigateByUrl('/motorcyclelist', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['motorcyclelist']);
          });
      },
      (error) => {
        console.log('Error al crear el repuesto', error);
        // this.errorMsg = error.errors;
        this.errorMsg = error.error.errors;
      }
    );
  }

  getProviders(): void {
    this.providerService.getProvider().subscribe((response) => {
      this.providers = response.provider;
    });
  }

  getMarca(): void {
    this.marcaService.getMarca().subscribe((response) => {
      this.marcas = response.marca;
    });
  }

  getCategories(): void {
    this.categoriService.getCategories().subscribe((response) => {
      this.categories = response.categories;
    });
  }

  /*  onFileSelected(event: any) {
    
    
      const file = event.target.files[0];
      this.form.patchValue({
        image: file
      });
      this.form.get('image')?.updateValueAndValidity();

      
    
  } */

  onFileSelected() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) {
        // this.form.get('image')?.updateValueAndValidity();
        this.form.get('image')?.setValue(file);

        // Create a new FileReader object to read the image data
        const reader = new FileReader();
        reader.onload = (event: any) => {
          // Set the image source to the data URL of the image
          this.imageSrc = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  }
}
