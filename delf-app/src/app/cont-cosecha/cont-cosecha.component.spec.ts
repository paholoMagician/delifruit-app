import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContCosechaComponent } from './cont-cosecha.component';

describe('ContCosechaComponent', () => {
  let component: ContCosechaComponent;
  let fixture: ComponentFixture<ContCosechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContCosechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContCosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
