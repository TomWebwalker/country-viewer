import { createAction, props } from '@ngrx/store';
import { Country } from '../typings/country';

export enum CountryListAction {
  FETCH = '[Country list] fetch',
  FETCH_SUCCESS = '[Country list] fetch success',
  FETCH_FAIL = '[Country list] fetch fail',
  FILTER = '[Country list] filter',
  VISIT_COUNTRY = '[Country list] visit country',
}

export const fetchCountryListSuccess = createAction(
  CountryListAction.FETCH_SUCCESS,
  props<{ payload: Country[] }>()
);

export const fetchCountryListFail = createAction(CountryListAction.FETCH_FAIL);

export const filterCountryList = createAction(
  CountryListAction.FILTER,
  props<{ payload: { name: string; region: string } }>()
);

export const visitCountry = createAction(
  CountryListAction.VISIT_COUNTRY,
  props<{ payload: { name: string; cca2: string } }>()
);
