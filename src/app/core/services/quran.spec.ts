import { TestBed } from '@angular/core/testing';

import { QuranService } from './quran';

describe('Quran', () => {
  let service: QuranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
