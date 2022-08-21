import { createReducer, on } from "@ngrx/store";
import { Country } from "../typings/country";
import { fetchCountryListSuccess, filterCountryList } from "./country-list.actions";

export interface CountryListStore {
  countries: Country[],
  visibleCountries: Country[],
  regions: string[]
}

export const initialState: CountryListStore = {
  countries: [],
  visibleCountries: [],
  regions: []
};

export const countryListReducer = createReducer(
  initialState,
  on(fetchCountryListSuccess, (_, { payload }) => (
    {
      countries: payload,
      regions: [...new Set(payload.map(({ region }) => region))],
      visibleCountries: payload
    }
  )),
  on(filterCountryList, (state, { payload }) => ({
    countries: state.countries,
    regions: state.regions,
    visibleCountries: filterCountries(state.countries, payload.name, payload.region)
  }))
);

function filterCountries(countries: Country[], name: string, region: string): Country[] {
  const filteredByName = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()));
  if (region) {
    return filteredByName.filter(country => country.region === region);
  }
  return filteredByName;
}
