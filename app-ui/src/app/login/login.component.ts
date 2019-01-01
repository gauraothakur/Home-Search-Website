import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component'
import { User } from '../model/user';
import { AuthService } from 'angular2-social-login';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails = {}
  errorMessage: String;
  public user;
  sub: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  showhide = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private headerComponent: HeaderComponent,
    public _auth: AuthService) { }

  ngOnInit() {
  }

  googleloginfunction() {
    this.sub = this._auth.login("google").subscribe(
      (data) => { console.log(data); this.user = data; return this.router.navigateByUrl('/landing-page'); }
    );
  }

  facebookloginfunction() {
    this.sub = this._auth.login("facebook").subscribe(
      (data) => { alert(JSON.stringify(data)); this.user = data; return this.router.navigateByUrl('/landing-page'); }
    );
  }
  /**
   * method to log a user, in
   */
  public login() {
    console.log(this.loginDetails)
    this.authenticationService.loginUser(this.loginDetails).subscribe(res => {
      if (res.token) {
        this.headerComponent.displayLogIn = false;
        this.headerComponent.getCurrentUser();
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

}
