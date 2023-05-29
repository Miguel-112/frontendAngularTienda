import { TestBed } from '@angular/core/testing';

import { InvoicedetailService } from './invoicedetail.service';

describe('InvoicedetailService', () => {
  let service: InvoicedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
