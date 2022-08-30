import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CountryListAction, CountryListStore, selectVisited } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly store = inject(Store<{ countryList: CountryListStore }>);
  title = 'country-viewer';
  readonly visited$ = this.store.select(selectVisited);
  darkMode = false;

  ngOnInit(): void {
    this.store.dispatch({ type: CountryListAction.FETCH });
  }

  triggerThemeHandler(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'my-dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'my-dark-theme');
    }
  }
}
