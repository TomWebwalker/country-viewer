/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Country', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));
});
