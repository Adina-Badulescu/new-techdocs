import { TestBed } from '@angular/core/testing';

import { GetScreenResolutionService } from './get-screen-resolution.service';

describe('GetScreenResolutionService', () => {
  let service: GetScreenResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetScreenResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
