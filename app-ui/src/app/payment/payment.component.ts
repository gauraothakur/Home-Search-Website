import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public currentLoggedInUser: User;
  constructor(private authenticationService: AuthenticationService, private userProfileService: UserProfileService) { }

  ngOnInit() {
  }
  /**
   * Method to register a user as a Pro User
   */
  public subscribeUser(): void {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser;
    this.currentLoggedInUser.isProUser = true;
    this.userProfileService.updateUserDetails(this.currentLoggedInUser).subscribe(
      (res: any) => {
        alert("Subscribed Successfully!")
      }
    );
  }
}
