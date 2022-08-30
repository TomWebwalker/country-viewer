import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountryListStore, selectViewState } from '../store';
import { map } from 'rxjs';
import { slideInOut } from '../utils/list-animation';
import { SearchFormComponent } from '../search-form/search-form.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    MatProgressSpinnerModule,
    MatListModule,
    ScrollingModule,
    RouterModule,
  ],
  animations: [slideInOut],
})
export class HomeComponent {
  private readonly store = inject(Store<{ countryList: CountryListStore }>);
  title = 'country-viewer';
  readonly countryList$ = this.store
    .select('countryList')
    .pipe(map((store) => store.visibleCountries));
  readonly viewState$ = this.store.select(selectViewState);
}
