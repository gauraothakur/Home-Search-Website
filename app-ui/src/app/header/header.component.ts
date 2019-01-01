import { Component, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationService } from '../services/navigation.service';
import { UserType } from '../model/userType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  public displaySignUp: boolean = false;
  public displayLogIn: boolean = false;
  public displaySubscription: boolean = false;
  public currentLoggedInUser: User = undefined;
  public isOwnerLoggedIn: boolean = false;
  public checkSavedProperties: boolean;
  constructor(private authenticationService: AuthenticationService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  /**
   * Get current logged in user
   */
  public getCurrentUser(): void {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser;
    if (!this.currentLoggedInUser && this.authenticationService.token) {
      this.authenticationService.getCurrentUser().subscribe(
        (res: User) => {
          this.currentLoggedInUser = res;
          this.authenticationService.currentLoggedInUser = res;
          this.isOwnerLoggedIn = this.checkUserType(res, UserType.OWN);
        }
      );
    }
  }
  /**
   * Check the type of user
   * @param user 
   * @param type 
   */
  private checkUserType(user: User, type: UserType): boolean {
    if (Number(user.userType) === type)
      return true;
  }
  /**
   * Method to show log in dialog
   */
  public showLogInDialog(): void {
    this.displayLogIn = true;
  }
  /**
   * Method to show sign up dialog
   */
  public showSignUpDialog(): void {
    this.displaySignUp = true;
  }
  /**
   * Navigate to User Profile
   */
  public goToUserProfile(): void {
    this.navigationService.goToUserProfile();
  }
  /**
   * Navigate to Property Listing Page
   */
  public goToPropertyListingsPage(): void {
    this.navigationService.isSavedPropertySelected = false;
    this.navigationService.goToPropertyListingsPage({ page: "mylistings" });
  }
  /**
   * navigate to saved property listing page
   */
  public goToSavedPropertyListingsPage(): void {
    this.navigationService.isSavedPropertySelected = true;
    this.navigationService.goToLandingPage();
    this.navigationService.goToPropertyListingsPage({ page: "mysavedproperties" });
  }
  /**
   * MEthod log the current logged in user, out
   */
  public logout(): void {
    localStorage.removeItem("jwt-token");
    this.navigationService.goToLandingPage();
    this.currentLoggedInUser = undefined;
    this.authenticationService.currentLoggedInUser = undefined;
  }

  public ngAfterContentChecked(): void {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser;
  }
  /**
   * Construct image url from its name
   */
  public getImageUrl(): string {
    if (this.currentLoggedInUser) {
      return "http://localhost:3000/api/file/" + this.currentLoggedInUser.profilePicture;
    }
  }
  /**
   * Display subscription Dialog
   */
  public showSubscriptionDialog(): void {
    this.displaySubscription = true;
  }

}
