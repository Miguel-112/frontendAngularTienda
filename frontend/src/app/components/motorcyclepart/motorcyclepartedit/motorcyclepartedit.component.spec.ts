import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleparteditComponent } from './motorcyclepartedit.component';

describe('MotorcycleparteditComponent', () => {
  let component: MotorcycleparteditComponent;
  let fixture: ComponentFixture<MotorcycleparteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcycleparteditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorcycleparteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
