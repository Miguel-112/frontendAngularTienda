import { TestBed } from '@angular/core/testing';

import { MotorcyclePartService } from './motorcycle-part.service';

describe('MotorcyclePartService', () => {
  let service: MotorcyclePartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorcyclePartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
