import { TestBed } from '@angular/core/testing';

import { ControlMotivService } from './control-motiv.service';

describe('ControlMotivService', () => {
  let service: ControlMotivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlMotivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
