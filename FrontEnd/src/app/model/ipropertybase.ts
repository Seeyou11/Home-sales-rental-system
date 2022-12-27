export interface IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  PType: string;
  FType: string;
  Price: number;
  BHK: number;
  BuiltArea: number;
  City: string;
  Address: string;
  //ready to move
  RTM: number;
  Image?: string;
}
