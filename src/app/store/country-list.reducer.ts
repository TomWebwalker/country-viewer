import { createReducer, createSelector, on } from '@ngrx/store';
import { Country } from '../typings/country';
import {
  fetchCountryListFail,
  fetchCountryListSuccess,
  filterCountryList,
  visitCountry,
} from './country-list.actions';

export interface CountryListStore {
  countries: Country[];
  visibleCountries: Country[];
  regions: string[];
  viewState: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  visitedCountries: { name: string; cca2: string }[];
}

export const initialState: CountryListStore = {
  countries: [],
  visibleCountries: [],
  regions: [],
  viewState: 'LOADING',
  visitedCountries: [],
};

export const countryListReducer = createReducer(
  initialState,
  on(fetchCountryListSuccess, (_, { payload }) => ({
    countries: payload,
    regions: [...new Set(payload.map(({ region }) => region))],
    visibleCountries: payload,
    viewState: 'LOADED',
    visitedCountries: [],
  })),
  on(filterCountryList, (state, { payload }) => ({
    ...state,
    visibleCountries: filterCountries(
      state.countries,
      payload.name,
      payload.region
    ),
  })),
  on(fetchCountryListFail, (state) => ({
    ...state,
    viewState: 'ERROR',
  })),
  on(visitCountry, (state, { payload }) => ({
    ...state,
    visitedCountries: filterVisited(payload, state.visitedCountries),
  }))
);

function filterVisited(
  payload: { name: string; cca2: string },
  countries: { name: string; cca2: string }[]
): { name: string; cca2: string }[] {
  if (countries.find((country) => country.cca2 === payload.cca2)) {
    return countries;
  } else {
    return [...countries, payload];
  }
}

function filterCountries(
  countries: Country[],
  name: string,
  region: string
): Country[] {
  const filteredByName = countries.filter((country) =>
    country.name.common.toLowerCase().includes(name.toLowerCase())
  );
  if (region) {
    return filteredByName.filter((country) => country.region === region);
  }
  return filteredByName;
}

export const selectCountryList = (state: { countryList: CountryListStore }) =>
  state.countryList;

export const selectViewState = createSelector(
  selectCountryList,
  (state: CountryListStore) => state.viewState
);

export const selectCountry = (cca2: string) =>
  createSelector(selectCountryList, (state: CountryListStore) =>
    state.countries.find((country) => country.cca2 === cca2)
  );

export const selectBorders = (borders: string[]) =>
  createSelector(selectCountryList, (state: CountryListStore) => {
    return borders
      .map((border) =>
        state.countries.find((country) => country.cca3 === border)
      )
      .map((country) => ({
        name: country!.name.common,
        cca2: country!.cca2,
      }));
  });

export const selectVisited = createSelector(
  selectCountryList,
  (state) => state.visitedCountries
);
