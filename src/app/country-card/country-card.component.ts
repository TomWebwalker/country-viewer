import { Country } from '../typings/country';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;


  constructor() {}

  ngOnInit() {}
}
