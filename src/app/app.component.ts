import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountryListAction } from './store';
import { Country } from './typings/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'country-viewer';

  countryList$!: Observable<Country[]>;

  constructor(private readonly store: Store<{ countryList: Country[] }>) {
    this.countryList$ = store.select('countryList');
  }

  ngOnInit(): void {
    this.store.dispatch({ type: CountryListAction.FETCH });
  }
}
