import { Property } from './../model/propertyDetails';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationService } from '../services/navigation.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-listings',
  templateUrl: './property-listings.component.html',
  styleUrls: ['./property-listings.component.scss']
})
export class PropertyListingsComponent implements OnInit {
  public display: boolean = false
  public currentLoggedInUser: User = {} as User
  public properties: Property[] = []
  public isSavedPropertiesPage: boolean = false

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private propertyService: PropertyService,
    private route: ActivatedRoute) {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser;
  }
  /**
   * Get properties for the logged in user
   */
  getUserProperties(): void {
    this.propertyService.getUserProperties(this.currentLoggedInUser).subscribe(
      (user: User) => {
        this.setProperties(user);
        console.log(user);
        this.properties.forEach(element => {
          console.log(element);
        });
      }
    );
  }
  /**
   * Set properties for given template
   * @param user 
   */
  setProperties(user: User) {
    if (this.navigationService.isSavedPropertySelected) {
      this.properties = user.savedProperties;
      this.isSavedPropertiesPage = true;
    }
    else {
      this.properties = user.properties;
    }
  }

  ngOnInit() {
    if (!this.authenticationService.isUserAuthenticated()) {
      this.router.navigateByUrl("/landing-page")
    }
    this.route.paramMap.subscribe(
      (params: any) => {
        this.getUserProperties();
      }
    );
  }
  /**
   * Navigate to Add a new Property Page
   */
  goToAddPropertiesPage() {
    if (this.properties.length < 10 || this.currentLoggedInUser.isProUser) {
      this.router.navigateByUrl("new-property");
    } else {
      alert("Cannot add more properties. To add more, Become a pro user.")
    }
  }

  /**
   * Navigate to property details page
   * @param property 
   */
  goToPropertyDetails(property: Property): void {
    console.log(property);
    let query = {
      _id: property._id,
    };
    this.navigationService.goToPropertyDetails(query);
  }




}
