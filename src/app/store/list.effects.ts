import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountryService } from '../country.service';

@Injectable()
export class ListEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[List component] fetch'),
      mergeMap(() =>
        this.countryService.getList$().pipe(
          map((countries) => ({
            type: '[List component] fetch success',
            payload: countries,
          })),
          catchError(() => of({ type: '[List component] fetch fail' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
