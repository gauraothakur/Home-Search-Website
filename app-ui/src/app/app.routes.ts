import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { PropertyListingsComponent } from './property-listings/property-listings.component';
import { PropertySearchComponent } from "./property-search/property-search.component";
import { NewPropertyComponent } from './new-property/new-property.component';
import { PropertyDetailsComponent } from "./property-details/property-details.component";
import { propertyInfoComponent } from "./propertyInfo/propertyInfo.component";
import { UpdatePropertyComponent } from "./update-property/update-property.component";


export const APP_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "landing-page",
        pathMatch: "full"
    },
    {
        path: "landing-page",
        component: LandingPageComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "property-listings",
        component: PropertyListingsComponent
    },
    {
        path: "property-search",
        component: PropertySearchComponent
    },
    {
        path: "new-property",
        component: NewPropertyComponent
    },
    {
        path: "property/:_id",
        component: PropertyDetailsComponent
    },
    {
        path: "update-property/:_id",
        component: UpdatePropertyComponent
    }

];

export const APP_ROUTER_PROVIDERS: any = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);