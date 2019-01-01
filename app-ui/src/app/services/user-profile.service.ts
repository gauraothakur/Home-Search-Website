import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  path = environment.path;
  constructor(private http: HttpClient) { }

  // service to update current user details
  public updateUserDetails(user: User): Observable<any> {
    return this.http.put( this.path +  "users/" + user._id, user).pipe(map((res) => res));
  }
}
