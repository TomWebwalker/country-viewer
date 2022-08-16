import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountryService } from '../country.service';
import { CountryListAction } from './country-list.actions';

@Injectable()
export class CountryListEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryListAction.FETCH),
      mergeMap(() =>
        this.countryService.getList$().pipe(
          map((list) => ({
            type: CountryListAction.FETCH_SUCCESS,
            payload: list,
          })),
          catchError(() => of({ type: CountryListAction.FETCH_FAIL }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
