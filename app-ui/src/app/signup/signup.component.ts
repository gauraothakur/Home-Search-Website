import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { HeaderComponent } from '../header/header.component'
import { NavigationService } from '../services/navigation.service';
import { User } from '../model/user';
import { StaticDataService } from '../services/static-data.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpDetails: User = {} as User;
  errorMessage: String;
  public states: SelectItem[];
  public userTypes: SelectItem[];

  constructor(private authenticationService: AuthenticationService,
    private headerComponent: HeaderComponent,
    private navigationService: NavigationService,
    private staticDataService: StaticDataService) { }

  ngOnInit() {
    this.populateDropDown();
  }
  /**
   * Sign up a USER
   */
  signUp() {
    console.log(this.signUpDetails)
    this.authenticationService.registerUser(this.signUpDetails).subscribe(res => {
      if (res.token) {
        this.headerComponent.displaySignUp = false
        this.navigationService.goToUserProfile();
        this.errorMessage = '';
        this.authenticationService.getCurrentUser().subscribe(
          (user: User) => {
            this.authenticationService.currentLoggedInUser = user;
          }
        );
      }
      else {
        this.errorMessage = res.error.message
        console.log(res.error.message);
      }
    }, (err) => {
      console.error(err);
    });
  }

  // function to show drop down list of states and user type
  private populateDropDown(): void {
    this.states = this.staticDataService.getStatesDropDown();
    this.userTypes = this.staticDataService.getUserTypeDropdown();
  }

}
