import { TestBed } from '@angular/core/testing';

import { CosechacontrolService } from './cosechacontrol.service';

describe('CosechacontrolService', () => {
  let service: CosechacontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosechacontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
