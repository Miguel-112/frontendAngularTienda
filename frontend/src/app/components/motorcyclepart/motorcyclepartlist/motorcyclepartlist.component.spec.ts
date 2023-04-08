import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcyclepartlistComponent } from './motorcyclepartlist.component';

describe('MotorcyclepartlistComponent', () => {
  let component: MotorcyclepartlistComponent;
  let fixture: ComponentFixture<MotorcyclepartlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcyclepartlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorcyclepartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
