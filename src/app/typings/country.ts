interface CountryNameNativeName {
  official: string;
  common: string;
}

interface CountryName {
  common: string;
  official: string;
  nativeName: {
    [key: string]: CountryNameNativeName;
  };
}

interface CountryCurrency {
  name: string;
  symbol: string;
}

interface CountryTranslation {
  official: string;
  common: string;
}

interface CountryDemonym {
  f: string;
  m: string;
}

export interface Country {
  name: CountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: { [key: string]: CountryCurrency };
  idd: { root: string; suffixes: string[] };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  translations: {
    [key: string]: CountryTranslation;
  };
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    [keys: string]: CountryDemonym;
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: { [key: string]: number };
  fifa: string;
  car: { signs: string[]; side: 'right' | 'left' };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: { latlng: [number, number] };
  postalCode: { format: string; regex: string };
}
