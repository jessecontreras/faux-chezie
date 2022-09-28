import { TestBed } from '@angular/core/testing';

import { ErgService } from './erg.service';

describe('ErgService', () => {
  let service: ErgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
