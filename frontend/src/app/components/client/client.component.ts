import { Component } from '@angular/core';

import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  client: Client[] = [];
  filteredClient: Client[]=[];
  searchTerm = ''
  clientForm!: FormGroup;
  isEdit = false;
  clientProviderId!: number;
  successMessage = ''
  errorMsg = ''



  constructor(private fb: FormBuilder, private clientservice: ClientService) {


  }

  ngOnInit(): void {
    this.getProviders();
    this.createForm();

  }

  createForm() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, ]],
      address: ['',[Validators.required,Validators.minLength(10)]]
    });
  }

  onSubmit() {

    if (this.clientForm.invalid) {
      console.log('holaaa');
      return;
    }

    console.log(this.isEdit);

    const formData = this.clientForm.value;

    if (this.isEdit) {

      console.log(this.isEdit);
      
      this.clientservice.updateClient(this.clientProviderId, formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProviders();
          this.successMessage = 'Cliente actualizado con exito';
        }, (error) => {
          console.log('Error al actualizar el cliente', error);
          this.errorMsg = error.error.error;

        });

    } else {
      this.clientservice.createClient(formData).subscribe(
        (response) => {
          this.resetForm();
          this.getProviders();
          this.successMessage = 'cliente creado con exito';

        }, (error) => {
          console.log('Error al registrar el cliente', error);
          this.errorMsg = error.error.error;

        }
      );
    }
  }

  onCreate() {
    if (this.clientForm.valid) {
      
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  resetForm() {
   this.clientForm.reset();
    this.isEdit = false;
  }

  onEdit(client: Client) {
    this.isEdit = true;
    console.log(this.isEdit);
    this.clientProviderId = client.id;
   this.clientForm.patchValue({
      name: client.name,
      email: client.email,
      tel: client.tel,
      address: client.address
    });
  }

  onDelete(id: number) {

     console.log(id);
    this.clientservice.deleteClient(id).subscribe(

      (response

      ) => {
        this.getProviders();
        this.successMessage = 'eliminado correctamente';



      }, (error) => {
        console.log('Error al eliminar el cliente', error);
        this.errorMsg = error.error.error;

      }
    );
 


  }



 


  getProviders(): void {
    this.clientservice.getClient().subscribe(response => {
      this.client = response.client;
      this.filteredClient = this.client;
      
    });
  }


  filterProviders(): void {
    if (!this.searchTerm) {
      this.filteredClient = this.client;
      return;
    }
    this.filteredClient = this.client.filter(client => {
      const nameMatches = client.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const emailMatches = client.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const telMatches = client.tel && client.tel.toLowerCase().includes(this.searchTerm.toLowerCase());
      const addressMatches = client.address && client.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      return nameMatches || emailMatches || telMatches || addressMatches;
    });

    console.log(this.filteredClient);
  }



}
