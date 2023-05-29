import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { Invoice } from '../../interfaces/invoice';

@Component({
  selector: 'app-invoce',
  templateUrl: './invoce.component.html',
  styleUrls: ['./invoce.component.css'],
})
export class InvoceComponent {
  invoiceM!: FormGroup;
  page = 1;
  perPage = 8;
  pageRange = 9;
  searchTerm = '';
  successMessage = '';
  errorMsg: any = {};
  errormsg = '';
  invoice: Invoice[] = [];
  totalPages: number[] = [];
  totalpage!: number;

  constructor(
    private formBuilder: FormBuilder,
    private invoiceservice: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  checkDates(group: FormGroup) {
    const startDate = group.controls['startDate'].value;
    const endDate = group.controls['endDate'].value;

    if (endDate < startDate) {
      return { notValid: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.invoiceM = this.formBuilder.group(
      {
        startDate: [this.getFirstDayOfMonth()],
        endDate: [this.getCurrentDay()],
      },
      { validator: this.checkDates }
    );

    const startDateControl: AbstractControl | null =
      this.invoiceM.get('startDate');
    const endDateControl: AbstractControl | null = this.invoiceM.get('endDate');

    if (startDateControl) {
      startDateControl.valueChanges.subscribe(() => {
        this.onDateRangeChanged();
      });
    }

    if (endDateControl) {
      endDateControl.valueChanges.subscribe(() => {
        this.onDateRangeChanged();
      });
    }

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1; // obtener la página actual de la URL
      this.onDateRangeChanged(); // Llamar al método después de suscribirse a los cambios de valor
      
    });
  }


  onDateRangeChanged(): void {
    const startDate = this.invoiceM.get('startDate')?.value;
    const endDate = this.invoiceM.get('endDate')?.value;
    console.log({ startDate, endDate });

    if (this.invoiceM.errors && this.invoiceM.errors['notValid']) {
      this.errormsg = 'La fecha final no debe ser menor que la fecha de inicio';
    } else {
      this.errormsg = '';
     
      this.invoiceservice
        .getInvoices(
          this.page,
          this.perPage,
          startDate,
          endDate,
          this.searchTerm
        )
        .subscribe((response) => {
          this.invoice = response.data;
          console.log(response.data);
          this.totalPages = [];
          for (let i = 1; i <= response.last_page; i++) {
            this.totalPages.push(i);
            this.totalpage = i;
          }
        });
    }
  }

  navigateToRoute() {}

  getFirstDayOfMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${this.padZero(month)}-01`;
  }

  getCurrentDay(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getPageRange(page: number, totalPages: number): number[] {
    const pageRange = this.pageRange;
    const pagesToShow = [];

    // Calcular el rango de páginas que se mostrarán en la lista de paginación
    let start = Math.max(page - Math.floor(pageRange / 2), 1);
    let end = Math.min(start + pageRange - 1, totalPages);

    // Ajustar el rango de páginas si se desborda
    const offset = pageRange - (end - start + 1);
    if (offset > 0) {
      start = Math.max(start - offset, 1);
      end = Math.min(start + pageRange - 1, totalPages);
    }

    // Agregar las páginas al arreglo a mostrar
    for (let i = start; i <= end; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  // navigateToDetaill(invoice: any) {

  //   debugger;
  //   console.log(invoice);
  //   this.router.navigate(['/invocedetail'], { state: { invoice } });
  // }

  navigateToDetaill(invoice: Invoice) {
    this.router.navigate(['/invocedetail'], { state: { invoice } });
  }
}
