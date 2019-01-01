import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../model/propertyDetails';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  public isSavedPropertySelected: boolean = false;
  public showLoginDialog: boolean = false;

  //function to navigate to the users profile
  public goToUserProfile(): Promise<boolean> {
    return this.router.navigateByUrl("/profile");
  }

  //function to navigate to the landing page
  public goToLandingPage(): Promise<boolean> {
    return this.router.navigateByUrl("/landing-page");
  }
    //function to navigate to the property listings page
  public goToPropertyListingsPage(query: any): Promise<boolean> {
    return this.router.navigate(["/property-listings", query]);
  }

  public goToUpdatePropertyPage(id: any): Promise<boolean> {
    return this.router.navigate(["/update-property", id]);
  }


  // function to navigate to the property search page
  public goToPropertyListing(query: any): Promise<boolean> {
    return this.router.navigate(["/property-search", query]);
  }
    // function to navigate to the property details page
  public goToPropertyDetails(query: any): Promise<boolean> {
    return this.router.navigate(["/property", query._id]);
  }
}
