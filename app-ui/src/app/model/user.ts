import { SelectItem } from "primeng/api";
import { Property } from './propertyDetails';
import { UserType } from "./userType";

export interface User {
    _id: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    userType: UserType;
    zipcode: string;
    profilePicture: any;
    fname: string;
    lname: string;
    contactEmail: string;
    properties: Array<Property>;
    isProUser: boolean;   
    savedProperties :Array<Property>;
}

