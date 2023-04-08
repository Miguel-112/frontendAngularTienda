import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcyclepartcreateComponent } from './motorcyclepartcreate.component';

describe('MotorcyclepartcreateComponent', () => {
  let component: MotorcyclepartcreateComponent;
  let fixture: ComponentFixture<MotorcyclepartcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcyclepartcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorcyclepartcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
