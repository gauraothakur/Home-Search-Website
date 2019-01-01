import { UserType } from './../model/userType';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Property } from '../model/propertyDetails';
import { AuthenticationService } from '../services/authentication.service';
import { PropertyService } from '../services/property.service';
import { UserProfileService } from '../services/user-profile.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  public property = {} as Property;
  public savedProperties = [] as Property[]
  public currentLoggedInUser: User = {} as User
  public isOwnerOrBroker: boolean = false
  public isSaved: boolean = false

  constructor(private authService: AuthenticationService,
    private router: Router,
    private propertyService: PropertyService,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private navigationService: NavigationService) {
    this.currentLoggedInUser = this.authService.currentLoggedInUser;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: any) => {
        this.property = params.get('_id');
        console.log(this.property);
        this.propertyService.getPropertyById(params.get('_id')).subscribe(
          (res: Property) => {
            console.log(res);
            this.property = res;

            this.authService.currentLoggedInUser.savedProperties.forEach(element => {
              if (String(element) === res._id) {
                this.isSaved = true;
              }
              else if (element._id === res._id) {
                this.isSaved = true;
              }
            });
          }
        );
      }
    );
    let userType = Number(this.currentLoggedInUser.userType)
    if (this.currentLoggedInUser && (userType === UserType.OWN || userType === UserType.AGENT)) {
      this.isOwnerOrBroker = true;
    }
  }
  /**
   * Save a property as Favorite
   * @param property
   */
  public likeProperty(property: Property): void {
    if (!this.currentLoggedInUser) {
      alert("Please Login to save this property");
      return;
    }
    console.log(this.authService.currentLoggedInUser);
    if (!this.authService.currentLoggedInUser.savedProperties) {
      this.savedProperties.push(property);
      this.authService.currentLoggedInUser.savedProperties = this.savedProperties
    }
    else {
      this.authService.currentLoggedInUser.savedProperties.push(property);
    }
    this.propertyService.updateUserProperties(this.authService.currentLoggedInUser).subscribe(
      (user: User) => {
        console.log(user);
        this.isSaved = true;
      });
    console.log(property);
    alert("Property saved successfully to your favorite list")
  }
  /**
   * Go to Update property page
   */
  public updateProperty() {
    this.navigationService.goToUpdatePropertyPage(this.property._id);
    this.isSaved = false;
  }

  public unlikeProperty(property: Property): void {
    this.propertyService.removeSavedProperty(property._id, this.authService.currentLoggedInUser).subscribe(
      (user: User) => {
        console.log(user);
        this.isSaved = false;
      }
    );
  }

}
