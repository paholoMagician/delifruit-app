import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecusadosComponent } from './recusados.component';

describe('RecusadosComponent', () => {
  let component: RecusadosComponent;
  let fixture: ComponentFixture<RecusadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecusadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecusadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
