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
  providerForm!: FormGroup;
  isEdit = false;
  editProviderId!: number;
  successMessage = ''
  errorMsg = ''

  constructor(private fb: FormBuilder, private providerService: ProviderService) {


  }

  ngOnInit(): void {
    this.getProvider();
    this.createForm();

  }

  createForm() {
    this.providerForm = this.fb.group({

      name: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required]

    });
  }

  onSubmit() {
    if (this.providerForm.invalid) {
      return;
    }

    const formData = this.providerForm.value;

    if (this.isEdit) {
      
      this.providerService.updateProvider(this.editProviderId, formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProvider();
          this.successMessage = 'Proveedor actualizado con exito';
        }, (error) => {
          console.log('Error al actualizar el proveedor', error);
          this.errorMsg = error.error.error;

        });

    } else {
      this.providerService.createProvider(formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProvider();
          this.successMessage = 'Proveedor creado con exito';

        }, (error) => {
          console.log('Error al registrar la categoria', error);
          this.errorMsg = error.error.error;

        }
      );
    }
  }

  resetForm() {
    this.providerForm.reset();
    this.isEdit = false;
  }

  onEdit(provider: Provider) {
    this.isEdit = true;
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
        this.getProvider();
        this.successMessage = 'eliminado correctamente';



      }, (error) => {
        console.log('Error al eliminar la categoria', error);
        this.errorMsg = error.error.error;

      }
    );
 


  }



  getProvider() {
    this.providerService.getProvider().subscribe((data: { provider: Provider[] }) => {
        this.providers = data.provider;

      },
      (error: any) => {
        console.error(error);
      });
  }



}
