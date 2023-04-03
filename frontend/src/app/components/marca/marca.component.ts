import { Component } from '@angular/core';
import { MarcaService } from 'src/app/services/marca/marca.service';
import { Marca } from 'src/app/interfaces/marca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {

  
  marca: Marca[] = [];
  filteredMarca: Marca[]=[];
  searchTerm = ''
  marcaForm!: FormGroup;
  isEdit = false;
  editMarcaId!: number;
  successMessage = ''
  errorMsg = ''
  

  constructor(private fb: FormBuilder, private marcaService: MarcaService) {


  }

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
  }

  createForm() {
    this.marcaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required,Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.marcaForm.invalid) {
      return;
    }

    const formData = this.marcaForm.value;

    if (this.isEdit) {
       this.  marcaService.updateMarca(this.editMarcaId, formData).subscribe(
        (response) => {
        this.resetForm();
        this.getCategories();
        this.successMessage = 'categoria actualizada con exito';
      },(error) => {
        console.log('Error al actualizar categoria', error);
        this.errorMsg = error.error.error;

      }); 

    } else {
      this. marcaService.createMarca(formData).subscribe(
        (response) => {
          this.resetForm();
          this.getCategories();
          this.successMessage = 'marca creada con exito';

        }, (error) => {
          console.log('Error al registrar la marca', error);
          this.errorMsg = error.error.error;

        }
      );
    }
  }

  resetForm() {
    this.marcaForm.reset();
    this.isEdit = false;
  }

  onEdit(marca: Marca) {
    this.isEdit = true;
    this.editMarcaId = marca.id;
    this.marcaForm.patchValue({
      name: marca.name,
      description: marca.description
    });
  }

  onDelete(id: number) {

    console.log(id);
    this. marcaService.deleteMarca(id).subscribe(

      (response

      ) => {
        this.getCategories();
        this.successMessage = 'eliminado correctamente';



      }, (error) => {
        console.log('Error al eliminar la marca', error);
        this.errorMsg = error.error.error;

      }
    );



  }


  getCategories(): void {
    this. marcaService.getMarca().subscribe(response => {
      this.marca = response.marca;
      this. filteredMarca = this.marca;
      
    });
  }


  onCreate() {
    if (this.marcaForm.valid) {
      // realizar acción de creación de categoría
    } else {
      this.marcaForm.markAllAsTouched();
    }
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
}
