import {AuthenticationService }from './../services/authentication.service'; 
import {Component, OnInit }from '@angular/core'; 
import {NavigationService }from '../services/navigation.service'; 
import {User }from '../model/user'; 
import {UserType }from '../model/userType'; 

@Component( {
  selector:'landing-page', 
  templateUrl:'./landing-page.component.html', 
  styleUrls:['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  public searchField:string = ""; 
  public isForRent:boolean; 
  public isSellButtonActive:boolean
  public currentLoggedInUser =  {}as User; 
  constructor(private navigationService:NavigationService, 
    private authenticationService:AuthenticationService ) {

  }
  /**
   * Method called when component is initiated
   */
  public ngOnInit():void {
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser; 
    // To set the default selected type of search as "RENT"
    this.setButtonActive(1); 
  }
  /**
   * Navigate to the search page
   */
  public navigateToListing():void {
    let query =  {
      isForRent:this.isForRent, 
      search:this.searchField
    }; 
    if (this.searchField === "") {
      delete query.search; 
    }
    this.currentLoggedInUser = this.authenticationService.currentLoggedInUser; 
    if ( ! this.currentLoggedInUser && this.isSellButtonActive) {
      alert("Please login for access"); 
      return; 
    }
    if (this.currentLoggedInUser && this.isSellButtonActive && (Number(this.currentLoggedInUser.userType) === UserType.CUST)) {
      alert("Please login as an Owner or Broker to login this page"); 
      return; 
    }
    this.navigationService.goToPropertyListing(query); 
  }


  private checkUserType(user:User, type:UserType):boolean {
    if (Number(user.userType) === type)
      return true; 
  }

  /**
   * Click event on buttons to set it as Active, before searching for properties
   * @param btnType number
   */
  public setButtonActive(btnType:number) {
    this.isSellButtonActive = false
    let rentBtn = document.getElementById("rent-btn"); 
    let buyBtn = document.getElementById("buy-btn"); 
    let sellBtn = document.getElementById("sell-btn"); 
    if (btnType === 1) {
      this.isForRent = true; 
      rentBtn.classList.remove("ui-button-secondary"); 
      rentBtn.classList.add("ui-button-primary"); 
      buyBtn.classList.remove("ui-button-primary"); 
      sellBtn.classList.remove("ui-button-primary"); 
      buyBtn.classList.add("ui-button-secondary"); 
      sellBtn.classList.add("ui-button-secondary"); 
    }else if (btnType === 2) {
      this.isForRent = false; 
      buyBtn.classList.remove("ui-button-secondary"); 
      buyBtn.classList.add("ui-button-primary"); 
      rentBtn.classList.remove("ui-button-primary"); 
      sellBtn.classList.remove("ui-button-primary"); 
      rentBtn.classList.add("ui-button-secondary"); 
      sellBtn.classList.add("ui-button-secondary"); 
    }else {
      sellBtn.classList.remove("ui-button-secondary"); 
      sellBtn.classList.add("ui-button-primary"); 
      rentBtn.classList.remove("ui-button-primary"); 
      buyBtn.classList.remove("ui-button-primary"); 
      rentBtn.classList.add("ui-button-secondary"); 
      buyBtn.classList.add("ui-button-secondary"); 
      this.isSellButtonActive = true; 
    }
  }
}
