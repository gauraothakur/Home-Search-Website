import { User } from './user';

export interface Property {
    _id: string;
    latitute:string;
    longitute:string;
    address: string;
    zipcode: string;
    price:string;
    propertyType:string;
    dateAvailable: string;
    beds: string;
    bath: string;
    leaseDuration:string;
    securityDeposit:string;
    isForRent:boolean;
    sqaureFeet: string;
    amenities: Array<string>;
    laundry: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    images: Array<any>;
    addedBy: User;
}