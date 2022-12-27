import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  //helps to get the data from parent component
  @Input()
  property!: IPropertyBase;
  @Input()
  hideIcon?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
