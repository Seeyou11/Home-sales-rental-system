import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties!: Array<IPropertyBase>;
  City = '';
  SearchCity = '';
  SortByParam = '';

  constructor(
    private route: ActivatedRoute,
    private housingServices: HousingService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; //means we are on rent property url else we are on base url
    }
    this.housingServices.getAllProperties(this.SellRent).subscribe((data) => {
      this.properties = data;
      console.log(data);
    });
  }
  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }
}
