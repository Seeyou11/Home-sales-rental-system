import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  FType!: string;
  Price!: number;
  BHK!: number;
  BuiltArea!: number;
  City!: string;
  Address!: string;
  Address2!: string;
  RTM!: number;
  Image?: string | undefined;
  Id!: number;
  SellRent!: number;
  Name!: string;
  PType!: string;
  CarpetArea!: string;
  FloorNo!: string;
  TotalFloor!: string;
  //age of property
  AOP!: string;
  MainEntrance!: string;
  Security!: string;
  Maintenance!: string;
  Possession!: string;
  Description!: string;
  PostedOn!: string;
  PostedBy!: string;
}
