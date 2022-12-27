import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property!: Property;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.params['id']);

    // this.route.data.subscribe((data: any) => {
    //   this.property = data['prp'];
    // });

    //kelay yalew yezin new tekto yeseraw

    this.route.params.subscribe((params) => {
      this.propertyId = +params['id'];
      this.housingService.getProperty(this.propertyId).subscribe(
        (data: any) => {
          this.property = data;
        },
        (error) => {}
      );
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/hi1.jpg',
        medium: 'assets/images/hi1.jpg',
        big: 'assets/images/hi1.jpg',
      },
      {
        small: 'assets/images/hi2.jpg',
        medium: 'assets/images/hi2.jpg',
        big: 'assets/images/hi2.jpg',
      },
      {
        small: 'assets/images/hi3.jpg',
        medium: 'assets/images/hi3.jpg',
        big: 'assets/images/hi3.jpg',
      },
      {
        small: 'assets/images/hi4.jpg',
        medium: 'assets/images/hi4.jpg',
        big: 'assets/images/hi4.jpg',
      },
      {
        small: 'assets/images/hi5.jpg',
        medium: 'assets/images/hi5.jpg',
        big: 'assets/images/hi5.jpg',
      },
    ];
  }
}
