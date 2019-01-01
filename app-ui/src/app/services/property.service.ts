import { User } from './../model/user';
import { Property } from './../model/propertyDetails';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  path = environment.path

  constructor(private http: HttpClient) { }
  // function to add a new property
  public addProperty(property: Property): Observable<any> {
    return this.http.post(this.path + "/users/" +property.addedBy._id+"/properties/" , property).pipe(map((res) => res));
  }

  //function to update a property details
  public updateProperty(property: Property): Observable<any> {
    return this.http.put(this.path + "/properties/" + property._id, property).pipe(map((res) => res));
  }

  // function to get list of properties for a particular user
  public getUserProperties(user: User): Observable<any> {
    return this.http.get(this.path + "/users/" +user._id+"/properties/").pipe(map((res) => res));
  }

  // function to get a property by any parameter
  public getProperties(query?: any): Observable<any> {

    return this.http.get(this.path + "/properties" + this.constructQueryString(query)).pipe(map((res) => res));
  }

  // function to update property for a user
  public updateUserProperties(user: User): Observable<any> {
    return this.http.put(this.path + "/users/" +user._id+"/properties/", user).pipe(map((res) => res)); 
  }

  // function tto return a property searched by an id
  public getPropertyById(id: any): Observable<any> {
    return this.http.get(this.path + "/properties/" + id).pipe(map((res) => res));
  }

  public removeSavedProperty(id: any, user:User): Observable<any>{
    return this.http.delete(this.path + "/users/"+user._id + "/properties/" +id ).pipe(map((res) => res));
  }

  private constructQueryString(query: any): string {
    console.log(query);
    let queryString: string = "?";
    for (let param in query) {
      if (query[param] !== "") {
        if (param === "amenities" || param == "images") {
          if (query[param].length > 0) {
            queryString += param + "=" + query[param] + "&";
          }
        } else {
          queryString += param + "=" + query[param] + "&";
        }
      }
    }
    return queryString;
  }

}
