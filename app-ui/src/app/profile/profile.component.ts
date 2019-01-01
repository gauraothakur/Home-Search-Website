import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NavigationService } from '../services/navigation.service';
import { UserProfileService } from '../services/user-profile.service';
import { FileUploaderService } from '../services/file-uploader.service';
import { StaticDataService } from '../services/static-data.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private userProfileService: UserProfileService,
    private fileUploader: FileUploaderService,
    private staticDataService: StaticDataService,
    private router: Router
  ) {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser;
  }

  public states: SelectItem[];
  public currentLoggedInUser: User = {} as User;
  public files: Array<any>;

  ngOnInit() {
    if (!this.currentLoggedInUser) {
      this.navigationService.goToLandingPage();
    }
    this.fileUploader.getUploader().onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 200) {
        let filename: string = response.split("uploads\\")[1];
        this.currentLoggedInUser.profilePicture = filename;
        this.updateUser();
      }
    };
    this.populateDropDown();
  }
  /**
   * Construct Image URL from its name
   */
  public getImageUrl(): string {
    if (this.currentLoggedInUser) {
      return "http://localhost:3000/api/file/" + this.currentLoggedInUser.profilePicture;
    }
  }
  /**
   * Populate the states dropdown
   */
  private populateDropDown(): void {
    this.states = this.staticDataService.getStatesDropDown();
    //this.router.navigateByUrl("/landing-page")
  }

  /**
   * Update user details
   */
  private updateUser(): void {
    this.userProfileService.updateUserDetails(this.currentLoggedInUser).subscribe(
      (user: User) => {
        console.log(user);
      }
    );
  }
}

