import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {
  ButtonModule, CheckboxModule, DialogModule,
  CarouselModule, AccordionModule, RadioButtonModule, InputMaskModule, CardModule
} from 'primeng/primeng';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthenticationService } from './services/authentication.service'
import { FileSelectDirective } from 'ng2-file-upload';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ToolbarModule } from 'primeng/toolbar';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { NewPropertyComponent } from './new-property/new-property.component';
import { PropertyListingsComponent } from './property-listings/property-listings.component';
import { propertyInfoComponent } from './propertyInfo/propertyInfo.component'
import { NavigationService } from './services/navigation.service';
import { FileUploadModule } from 'primeng/fileupload';
import { UserProfileService } from './services/user-profile.service';
import { StaticDataService } from './services/static-data.service';
import { PlaceAutoCompleteComponent } from './place-auto-complete/place-auto-complete.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PropertySearchComponent } from './property-search/property-search.component';
import { PropertyMapComponent } from './property-search/property-map/property-map.component';
import { PropertyGridComponent } from './property-search/property-grid/property-grid.component';
import { PaymentComponent } from './payment/payment.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AgentFinderComponent } from './agent-finder/agent-finder.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { UpdatePropertyComponent } from './update-property/update-property.component';

let socialloginproviders = {
  "google":{
    "clientId":"1077354495365-kntvnlem1ne7lj99mq3rsh8a25jvk9v4.apps.googleusercontent.com"
  },
  "facebook":{
    "clientId":"204970923715674",
    "apiVersion": "v3.2"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    NewPropertyComponent,
    FileSelectDirective,
    PropertyListingsComponent,
    PropertySearchComponent,
    propertyInfoComponent,
    PropertyMapComponent,
    PropertyGridComponent,
    PlaceAutoCompleteComponent,
    CarouselComponent,
    PaymentComponent,
    PropertyDetailsComponent,
    AgentFinderComponent,
    UpdatePropertyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
    NgbModule,
    TabViewModule,
    Angular2SocialLoginModule,
    CarouselModule,
    RadioButtonModule,
    CheckboxModule,
    InputMaskModule,
    CardModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCIx6PCS1QqXGzmWw_A3LO7Y7cykdpnT5Q'
      apiKey: 'AIzaSyAjlDasXz1lWGb_dYAjCTRxaHnhmCIVZDs'
    }),
    ToolbarModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    NavigationService,
    UserProfileService,
    StaticDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(socialloginproviders);

