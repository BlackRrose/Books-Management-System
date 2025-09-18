import { TestBed } from '@angular/core/testing';

import { BookAPIServiceService } from './book-api-service.service';

describe('BookAPIServiceService', () => {
  let service: BookAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
