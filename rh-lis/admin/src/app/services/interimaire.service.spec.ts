import { TestBed } from '@angular/core/testing';

import { InterimaireService } from './interimaire.service';

describe('InterimaireService', () => {
  let service: InterimaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterimaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
