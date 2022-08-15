import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'country-viewer';

  countryList$!: Observable<any[]>;

  constructor(
    private readonly store: Store<{ list: any[] }>
  ) {
    this.countryList$ = store.select('list');
  }

  ngOnInit(): void {
    this.store.dispatch({ type: '[List component] fetch' });
  }

}
