import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotRecComponent } from './mot-rec.component';

describe('MotRecComponent', () => {
  let component: MotRecComponent;
  let fixture: ComponentFixture<MotRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotRecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
