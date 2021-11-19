import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContDevolucionComponent } from './cont-devolucion.component';

describe('ContDevolucionComponent', () => {
  let component: ContDevolucionComponent;
  let fixture: ComponentFixture<ContDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContDevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
