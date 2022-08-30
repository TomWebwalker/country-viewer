import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);

  getList$(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
