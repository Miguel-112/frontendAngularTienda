import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/interfaces/invoice';
import { InvoicedetailService } from 'src/app/services/invoicedetail/invoicedetail.service';
import { InvoiceDetail } from 'src/app/interfaces/invoicedetail';


@Component({
  selector: 'app-invoicedetail',
  templateUrl: './invoicedetail.component.html',
  styleUrls: ['./invoicedetail.component.css']
})
export class InvoicedetailComponent {
  invoiceD: FormGroup;
  invoice: Invoice;
  invoicedetail: InvoiceDetail[]=[];

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,private invoiceservice:InvoicedetailService) {
    this.invoiceD = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });

    this.invoice = history.state.invoice;
  
    console.log(this.invoice); // Aquí puedes ver el objeto invoice
  }

  onDateRangeChanged(): void {
    // handle date range change here
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.geInvoiceDetail();
  }

  geInvoiceDetail(): void {

      this.invoiceservice.getInvoiceDetail(this.invoice.id).subscribe(response => {
        this.invoicedetail = response;
        console.log(this.invoicedetail);
       
      });
    }

   
}
