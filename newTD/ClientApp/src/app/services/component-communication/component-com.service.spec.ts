import { TestBed } from '@angular/core/testing';

import { ComponentComService } from './component-com.service';

describe('ComponentComService', () => {
  let service: ComponentComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
