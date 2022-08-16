import { createReducer, on } from '@ngrx/store';
import { Country } from '../typings/country';
import { fetchCountryListSuccess } from './country-list.actions';

export const initialState: Country[] = [];

export const countryListReducer = createReducer(
  initialState,
  on(fetchCountryListSuccess, (_, { payload }) => payload)
);
