import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CountryListAction,
  CountryListStore,
  selectBorders,
  selectCountry,
} from '../store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Country } from '../typings/country';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
})
export class CountryCardComponent {
  private readonly store = inject(Store<{ countryList: CountryListStore }>);
  private readonly cca2$ = inject(ActivatedRoute).params.pipe(
    map((params) => params['cca2'])
  );
  readonly country$ = this.cca2$.pipe(
    switchMap(
      (cca2) => this.store.select(selectCountry(cca2)) as Observable<Country>
    ),
    filter(Boolean),
    tap((country) =>
      this.store.dispatch({
        type: CountryListAction.VISIT_COUNTRY,
        payload: {
          name: country.name.common,
          cca2: country.cca2,
        },
      })
    )
  );
  readonly borders$ = this.country$.pipe(
    switchMap((country) => this.store.select(selectBorders(country!.borders)))
  ) as Observable<{ name: string; cca2: string }[]>;

  getLanguages(languages: { [key: string]: string }): string {
    return Object.values(languages).join(', ');
  }
}
