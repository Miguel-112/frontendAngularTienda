import { Component } from '@angular/core';
import { MotorcyclePartService } from 'src/app/services/motorcyclepart/motorcycle-part.service';
import { ActivatedRoute } from '@angular/router';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';
import { MotorcyclePartWithRelations } from 'src/app/interfaces/motorcyclepartwithrelations';

@Component({
  selector: 'app-motorcyclepartlist',
  templateUrl: './motorcyclepartlist.component.html',
  styleUrls: ['./motorcyclepartlist.component.css']
})
export class MotorcyclepartlistComponent {


  page = 1;
  perPage = 5;
  // motorcycleparts: MotorcyclePart[] = [];
  motorcycleparts: MotorcyclePartWithRelations[]=[];

  totalPages: number[] = [];
  searchTerm = ''
  successMessage = ''
  errorMsg: any = {};

  motorcyclepartSeleccionado!: MotorcyclePart;

  mostrarFormularioedit(motorcyclepart: MotorcyclePartWithRelations): void {
    this.motorcyclepartSeleccionado = motorcyclepart;
    this. mostrarComponentedit  = true;
  }
 

  mostrarComponente = false;
  mostrarComponentedit = false;


  mostrarFormulario() {
    this.mostrarComponente = true;
  }

  cerrarFormulario() {
    this.mostrarComponente = false;
  }


 /*  mostrarFormularioedit() {
    this. mostrarComponentedit  = true;
  } */

  cerrarFormularioedit() {
    this. mostrarComponentedit  = false;
  }

  constructor(private motorcyclepart: MotorcyclePartService, private route: ActivatedRoute){}

 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1; // obtener la página actual de la URL
      this.getMotorcycleParts();
      /* this.getCategories();
      this.getMarca(); */
     
    });

   
  }


  getMotorcycleParts(): void {

    console.log(this.searchTerm);

      this.motorcyclepart.getMotorcycleParts(this.page,this.perPage,0,0,this.searchTerm).subscribe(response => {
        this.motorcycleparts = response.data;
        console.log(response.data);
        this.totalPages = [];
        for (let i = 1; i <= response.last_page; i++) {
          this.totalPages.push(i);
        }
      });
    }

    actualizarLista(event: boolean) {
      
     this.getMotorcycleParts();
    }

/* 
    onChildUpdated(event: boolean) {
      // Actualizar datos
      // ...
  
      // Refrescar componente
      this.ngOnInit();
    } */
    
    
    // ...

    onChildUpdated(event: boolean) {
      // Actualizar datos
      // ...
      
      // Refrescar componente
      this.getMotorcycleParts();
    }


   

    


    

    trackByFn(index: number, item: any): number {
      return item.id; 
    }


    Ondelete(id: number){

      console.log(id);
      this.motorcyclepart.deleteMotorcycleParts(id).subscribe(
  
        (response
  
        ) => {
          this.getMotorcycleParts();
          this.successMessage = 'eliminado correctamente';
  
  
  
        }, (error) => {
          console.log('Error al eliminar la categoria', error);
          this.errorMsg = error.error.error;
  
        }
      );
    }



}
