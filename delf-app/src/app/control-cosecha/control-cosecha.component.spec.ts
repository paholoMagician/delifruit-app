import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCosechaComponent } from './control-cosecha.component';

describe('ControlCosechaComponent', () => {
  let component: ControlCosechaComponent;
  let fixture: ComponentFixture<ControlCosechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCosechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
