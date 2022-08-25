import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, map } from "rxjs";
import { CountryListAction, CountryListStore } from "../store";
import { Store } from "@ngrx/store";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatButtonToggleModule
  ],
  standalone: true
})
export class SearchFormComponent {
  private readonly store = inject(Store<{ countryList: CountryListStore }>);
  readonly regions$ = this.store.select("countryList").pipe(map(store => store.regions));

  readonly form = new FormGroup({
    name: new FormControl<string>(""),
    region: new FormControl<string>("")
  });

  constructor() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(payload => {
      this.store.dispatch({ type: CountryListAction.FILTER, payload });
    });
  }
}
