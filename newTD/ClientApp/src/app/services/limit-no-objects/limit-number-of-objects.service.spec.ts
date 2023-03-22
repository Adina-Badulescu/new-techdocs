import { TestBed } from '@angular/core/testing';

import { LimitNumberOfObjectsService } from './limit-number-of-objects.service';

describe('LimitNumberOfObjectsService', () => {
  let service: LimitNumberOfObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitNumberOfObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
