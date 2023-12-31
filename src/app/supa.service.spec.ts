/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupaService } from './supa.service';

describe('Service: Supa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupaService]
    });
  });

  it('should ...', inject([SupaService], (service: SupaService) => {
    expect(service).toBeTruthy();
  }));
});
