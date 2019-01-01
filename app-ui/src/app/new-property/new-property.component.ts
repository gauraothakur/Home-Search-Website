import { NavigationService } from './../services/navigation.service';
import { User } from './../model/user';
import { Component, OnInit, ViewChild, AfterContentChecked, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploaderService } from '../services/file-uploader.service';
import { Property } from '../model/propertyDetails';
import { PropertyService } from '../services/property.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit, AfterContentChecked {
  public imageDetails: any[] = [];
  isRent: boolean = false;
  public propertyDetails: Property = {} as Property;
  selectedAmenities: string[] = [];
  public currentLoggedInUser: User = {} as User;
  public latitude: number = 0;
  public longitude: number = 0;
  fileName: string;
  public files: Array<any> = [];
  public isUpdate: boolean = false;


  constructor(private authService: AuthenticationService,
    private router: Router,
    private fileUploader: FileUploaderService,
    private propertyService: PropertyService,
    private navigationsvc: NavigationService) {
  }

  ngOnInit() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl("/landing-page")
    }
    this.currentLoggedInUser = this.authService.currentLoggedInUser;
    this.fileUploader.getUploader().onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response.split("uploads\\")[1]);
      if (status == 200) {
        let filename: string = response.split("uploads\\")[1];
        this.imageDetails.push({ src: this.getImageUrl(filename) });
        this.fileName = filename;
      }
    };
  }
  /**
   * Upload selected files using the fileUploader
   */
  public uploadFiles(): void {
    this.fileUploader.getUploader().uploadAll();
  }
  /**
   * Construct image URL from its name
   * @param item 
   */
  public getImageUrl(item: string): string {
    return "http://localhost:3000/api/file/" + item;
    if (this.currentLoggedInUser) {

    }
  }
  /**
   * Get the geolocation detail from entered text frm the GOOGLE PLACES API
   * @param place 
   */
  getLocation(place: Object) {
    this.propertyDetails.latitute = place['geometry'].location.lat();
    this.propertyDetails.longitute = place['geometry'].location.lng();
    this.latitude = place['geometry'].location.lat();
    this.longitude = place['geometry'].location.lng();
    this.propertyDetails.address = place['formatted_address'];
    place['address_components'].forEach(element => {
      if (element['types'].indexOf("postal_code") > -1) {
        this.propertyDetails.zipcode = element['short_name']
      }
    });

  }
  /**
   * Method to add a property listing
   */
  addProperty(): void {
    this.propertyDetails.addedBy = this.currentLoggedInUser;
    this.propertyDetails.images = this.imageDetails;
    this.propertyService.addProperty(this.propertyDetails).subscribe(
      (property: Property) => {
        console.log(property);
      }
    );
    alert("Property added successfully")
  }

  public ngAfterContentChecked(): void {
    this.currentLoggedInUser = this.authService.currentLoggedInUser;
  }
  /**
   * Navigate to previous page, i.e Listings page
   */
  goToPreviousPage(): void {
    this.navigationsvc.goToPropertyListingsPage({ page: "mylistings" });
  }
}

