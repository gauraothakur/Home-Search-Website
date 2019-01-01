import { UserProfileService } from './../services/user-profile.service';
import { User } from './../model/user';
import { Property } from './../model/propertyDetails';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-propertyInfo',
  templateUrl: './propertyInfo.component.html',
  styleUrls: ['./propertyInfo.component.scss']
})
export class propertyInfoComponent implements OnInit {
  public property= {} as Property;
  public savedProperties= [] as  Array<Property>

  constructor(private authService: AuthenticationService,
    private router: Router,
    private propertyService: PropertyService, private route: ActivatedRoute,
    private userProfileService: UserProfileService) { 
    }

 
  ngOnInit() {

    if(!this.authService.isUserAuthenticated){
      this.router.navigateByUrl("landing-page");
    }
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.propertyService.getProperties(params))).subscribe(
          (res: any) => {
            this.property = res[0];
            console.log(this.property);
          }
        );
  }

  saveToFavorites(property:Property){
    console.log(this.authService.currentLoggedInUser);
    if(!this.authService.currentLoggedInUser.savedProperties){
      this.savedProperties.push(property);
      this.authService.currentLoggedInUser.savedProperties= this.savedProperties
    }
    else{
       this.authService.currentLoggedInUser.savedProperties.push(property);
    }
    this.propertyService.updateUserProperties(this.authService.currentLoggedInUser).subscribe(
      (user: User) => {
        console.log(user);
      }
    );
    console.log(property);

  }

}
