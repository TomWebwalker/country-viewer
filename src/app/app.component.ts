import { Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { CountryListAction, CountryListStore, selectLoading } from "./store";
import { Country } from "./typings/country";
import { fadeAnimation, listAnimation, slideInOut } from "./utils/list-animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [slideInOut],
})
export class AppComponent implements OnInit {
  private readonly store = inject( Store<{ countryList: CountryListStore }>);
  title = "country-viewer";
  readonly countryList$ = this.store.select("countryList").pipe(map(store => store.visibleCountries));
  readonly loading$ = this.store.select(selectLoading)



  ngOnInit(): void {
    this.store.dispatch({ type: CountryListAction.FETCH });
  }


}
