import { Component } from '@angular/core';



import { ProviderService } from 'src/app/services/provider/provider.service';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Provider } from 'src/app/interfaces/provider';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {


  providers: Provider[] = [];
  filteredProviders: Provider[]=[];
  searchTerm = ''
  providerForm!: FormGroup;
  isEdit = false;
  editProviderId!: number;
  successMessage = ''
  errorMsg = ''

  constructor(private fb: FormBuilder, private providerService: ProviderService) {


  }

  ngOnInit(): void {
    this.getProviders();
    this.createForm();

  }

  createForm() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, ]],
      address: ['',[Validators.required,Validators.minLength(10)]]
    });
  }

  onSubmit() {

    if (this.providerForm.invalid) {
      console.log('holaaa');
      return;
    }

    console.log(this.isEdit);

    const formData = this.providerForm.value;

    if (this.isEdit) {

      console.log(this.isEdit);
      
      this.providerService.updateProvider(this.editProviderId, formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProviders();
          this.successMessage = 'Proveedor actualizado con exito';
        }, (error) => {
          console.log('Error al actualizar el proveedor', error);
          this.errorMsg = error.error.error;

        });

    } else {
      this.providerService.createProvider(formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProviders();
          this.successMessage = 'Proveedor creado con exito';

        }, (error) => {
          console.log('Error al registrar la categoria', error);
          this.errorMsg = error.error.error;

        }
      );
    }
  }

  onCreate() {
    if (this.providerForm.valid) {
      // realizar acción de creación de categoría
    } else {
      this.providerForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.providerForm.reset();
    this.isEdit = false;
  }

  onEdit(provider: Provider) {
    this.isEdit = true;
    console.log(this.isEdit);
    this.editProviderId = provider.id;
    this.providerForm.patchValue({
      name: provider.name,
      email: provider.email,
      tel: provider.tel,
      address: provider.address
    });
  }

  onDelete(id: number) {

     console.log(id);
    this.providerService.deleteProvider(id).subscribe(

      (response

      ) => {
        this.getProviders();
        this.successMessage = 'eliminado correctamente';



      }, (error) => {
        console.log('Error al eliminar la categoria', error);
        this.errorMsg = error.error.error;

      }
    );
 


  }



 


  getProviders(): void {
    this.providerService.getProvider().subscribe(response => {
      this.providers = response.provider;
      this.filteredProviders = this.providers;
      
    });
  }


  filterProviders(): void {
    if (!this.searchTerm) {
      this.filteredProviders = this.providers;
      return;
    }
    this.filteredProviders = this.providers.filter(provider => {
      const nameMatches = provider.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const emailMatches = provider.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const telMatches = provider.tel && provider.tel.toLowerCase().includes(this.searchTerm.toLowerCase());
      const addressMatches = provider.address && provider.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      return nameMatches || emailMatches || telMatches || addressMatches;
    });

    console.log(this.filteredProviders);
  }



}
