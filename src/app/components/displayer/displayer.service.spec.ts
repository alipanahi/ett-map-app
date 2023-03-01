import { TestBed } from '@angular/core/testing';

import { DisplayerService } from './displayer.service';

describe('DisplayerService', () => {
  let service: DisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
