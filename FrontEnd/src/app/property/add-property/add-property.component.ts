import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm?: NgForm;

  addPropertyForm!: FormGroup;
  NextClicked?: boolean;

  property = new Property();

  @ViewChild('formTabs') formTabs?: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  readyToMove: Array<string> = ['Yes', 'No'];
  cityList?: any[];

  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    SellRent: 0,
    PType: '',
    FType: '',
    Price: 0,
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0,
    Address: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingServive: HousingService,
    private alertyfy: AlertyfyService
  ) {}

  ngOnInit(): void {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['', Validators.required],
        BHK: ['', Validators.required],
        PType: ['', Validators.required],
        FType: ['', Validators.required],
        Name: ['', Validators.required],
        City: ['', Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: ['', Validators.required],
        BuiltArea: ['', Validators.required],
        CarpetArea: ['', Validators.required],
        Security: ['', Validators.required],
        Maintenance: ['', Validators.required],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [''],
        TotalFloor: [''],
        Address: [''],
        LandMark: [''],
      }),

      OtherInfo: this.fb.group({
        RTM: [''],
        PosessionOn: [''],
        AOP: [''],
        MainEntrance: [''],
        Description: [''],
      }),
    });
    this.housingServive.getAllCities().subscribe((data) => {
      this.cityList = data;
      console.log(data);
    });
  }

  // #region <Getter Method>

  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  //#endregion

  //#region <FormControls>

  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormGroup;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormGroup;
  }
  get PType() {
    return this.BasicInfo.controls['PType'] as FormGroup;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormGroup;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormGroup;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormGroup;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormGroup;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormGroup;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormGroup;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormGroup;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormGroup;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormGroup;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormGroup;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormGroup;
  }
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormGroup;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormGroup;
  }
  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormGroup;
  }
  get PosessionOn() {
    return this.OtherInfo.controls['PosessionOn'] as FormGroup;
  }
  get Description() {
    return this.OtherInfo.controls['Description'] as FormGroup;
  }
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormGroup;
  }

  //#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.NextClicked = true;

    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingServive.addProperty(this.property);
      this.alertyfy.success(
        'Congrats, your property Added succesfully on our website'
      );
      console.log(this.addPropertyForm);

      if (this.SellRent.value == 2) {
        this.router.navigate(['rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertyfy.error('please review the form and provide all valid');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingServive.newPropID();
    // + is convert the value to number
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.FType = this.FType.value;
    this.property.City = this.City.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.AOP = this.AOP.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PosessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      if (this.formTabs?.tabs[0]) {
        this.formTabs.tabs[0].active = true;
      }
      return false;
    }

    if (this.PriceInfo.invalid) {
      if (this.formTabs?.tabs[1]) {
        this.formTabs.tabs[1].active = true;
      }
      return false;
    }
    if (this.AddressInfo.invalid) {
      if (this.formTabs?.tabs[2]) {
        this.formTabs.tabs[2].active = true;
      }
      return false;
    }

    if (this.OtherInfo.invalid) {
      if (this.formTabs?.tabs[3]) {
        this.formTabs.tabs[3].active = true;
      }
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid?: boolean) {
    this.NextClicked = true;
    if (IsCurrentTabValid) {
      if (this.formTabs?.tabs[tabId]) {
        this.formTabs.tabs[tabId].active = true;
      }
    }
  }
}
