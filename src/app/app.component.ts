import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { debounceTime, map, Observable } from "rxjs";
import { CountryListAction, CountryListStore } from "./store";
import { Country } from "./typings/country";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = "country-viewer";

  countryList$!: Observable<Country[]>;
  regions$!: Observable<string[]>;
  readonly form = new FormGroup({
    name: new FormControl<string>(""),
    region: new FormControl<string>("")
  });

  constructor(private readonly store: Store<{ countryList: CountryListStore }>) {
    this.countryList$ = store.select("countryList").pipe(map(store => store.visibleCountries));
    this.regions$ = store.select("countryList").pipe(map(store => store.regions));
  }

  ngOnInit(): void {
    this.store.dispatch({ type: CountryListAction.FETCH });
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(payload => {
      this.store.dispatch({ type: CountryListAction.FILTER, payload });
    });

  }


}
