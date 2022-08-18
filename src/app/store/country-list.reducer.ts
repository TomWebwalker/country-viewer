import { createReducer, on } from '@ngrx/store';
import { Country } from '../typings/country';
import { fetchCountryListSuccess } from './country-list.actions';

export interface CountryListStore {
  countries: Country[],
  visibleCountries: Country[],
  regions: string[]
}

export const initialState: CountryListStore = {
  countries: [],
  visibleCountries: [],
  regions: [],
};

export const countryListReducer = createReducer(
  initialState,
  on(fetchCountryListSuccess, (_, {payload}) => (
    {
      countries: payload,
      regions: [...new Set(payload.map(({region}) => region))],
      visibleCountries: payload
    }
  ))
);
