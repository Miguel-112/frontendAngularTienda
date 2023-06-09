import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Category } from 'src/app/interfaces/category';

import { CategoriesService } from 'src/app/services/categories.service';



// import { ApiService } from './api.service';


@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent {

  categories: Category[] = [];
  filteredCategory: Category[]=[];
  searchTerm = ''
  categoryForm!: FormGroup;
  isEdit = false;
  editCategoryId!: number;
  successMessage = ''
  errorMsg = ''
  

  constructor(private fb: FormBuilder, private categoriService: CategoriesService) {


  }

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required,Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    const formData = this.categoryForm.value;
    console.log(formData);

    if (this.isEdit) {
       this. categoriService.updateCategory(this.editCategoryId, formData).subscribe(
        (response) => {
        this.resetForm();
        this.getCategories();
        this.successMessage = 'categoria actualizada con exito';
      },(error) => {
        console.log('Error al actualizar categoria', error);
        this.errorMsg = error.error.error;

      }); 

    } else {
      this.categoriService.createCategory(formData).subscribe(
        (response) => {
          this.resetForm();
          this.getCategories();
          this.successMessage = 'categoria creada con exito';


        }, (error) => {
          console.log('Error al registrar la categoria', error);
          this.errorMsg = error.error.error;

        }
      );
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.isEdit = false;
  }

  onEdit(category: Category) {
    this.isEdit = true;
    this.editCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  onDelete(id: number) {

    console.log(id);
    this.categoriService.deleteCategory(id).subscribe(

      (response

      ) => {
        this.getCategories();
        this.successMessage = 'eliminado correctamente';



      }, (error) => {
        console.log('Error al eliminar la categoria', error);
        this.errorMsg = error.error.error;

      }
    );



  }


  getCategories(): void {
    this.categoriService.getCategories().subscribe(response => {
      this.categories = response.categories;
      this. filteredCategory = this.categories;
      
    });
  }


  onCreate() {
    if (this.categoryForm.valid) {
      // realizar acción de creación de categoría
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }





  filterCategory(): void {
    if (!this.searchTerm) {
      this.filteredCategory = this.categories;
      return;
    }
    this.filteredCategory = this.categories.filter(category => {
      return category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             category.description.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }








}
