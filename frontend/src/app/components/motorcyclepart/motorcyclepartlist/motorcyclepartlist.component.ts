import { Component } from '@angular/core';
import { MotorcyclePartService } from 'src/app/services/motorcyclepart/motorcycle-part.service';
import { ActivatedRoute } from '@angular/router';
import { MotorcyclePart } from 'src/app/class/motorcyclepart';

@Component({
  selector: 'app-motorcyclepartlist',
  templateUrl: './motorcyclepartlist.component.html',
  styleUrls: ['./motorcyclepartlist.component.css']
})
export class MotorcyclepartlistComponent {


  page = 1;
  perPage = 5;
  motorcycleparts: MotorcyclePart[] = [];
  totalPages: number[] = [];
  searchTerm = ''
 

  mostrarComponente = false;

  mostrarFormulario() {
    this.mostrarComponente = true;
  }

  cerrarFormulario() {
    this.mostrarComponente = false;
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

    trackByFn(index: number, item: any): number {
      return item.id; 
    }

}
