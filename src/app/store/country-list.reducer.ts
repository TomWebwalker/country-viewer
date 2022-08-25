import { createReducer, createSelector, on } from "@ngrx/store";
import { Country } from "../typings/country";
import { fetchCountryListSuccess, filterCountryList } from "./country-list.actions";

export interface CountryListStore {
  countries: Country[],
  visibleCountries: Country[],
  regions: string[],
  loading: boolean,
}

export const initialState: CountryListStore = {
  countries: [],
  visibleCountries: [],
  regions: [],
  loading: true,
};

export const countryListReducer = createReducer(
  initialState,
  on(fetchCountryListSuccess, (_, { payload }) => (
    {
      countries: payload,
      regions: [...new Set(payload.map(({ region }) => region))],
      visibleCountries: payload,
      loading: false
    }
  )),
  on(filterCountryList, (state, { payload }) => ({
    countries: state.countries,
    regions: state.regions,
    visibleCountries: filterCountries(state.countries, payload.name, payload.region),
    loading: false
  }))
);

function filterCountries(countries: Country[], name: string, region: string): Country[] {
  const filteredByName = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()));
  if (region) {
    return filteredByName.filter(country => country.region === region);
  }
  return filteredByName;
}

export const selectCountryList = (state: { countryList: CountryListStore }) => state.countryList;


export const selectLoading = createSelector(selectCountryList, (state: CountryListStore) => state.loading);
