import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from '../model/user';
import { environment } from '../../environments/environment'


@Injectable()
export class AuthenticationService {
    path = environment.path

    token_key = 'jwt-token';

    public currentLoggedInUser: User = undefined;
    public showLoginDialog: boolean = false;

    constructor(private http: HttpClient) { }

    /**
     *  Get token property
     */
    get token() {
        return localStorage.getItem(this.token_key)
    }

    /**
     *  Verify if user is authenticated/ logged in
     */
    public isUserAuthenticated() {
        const user = this.getUserFromPayload();
        if (!user)
            return false;
        console.log(user.exp);
        console.log(moment().format());
        return user.exp > moment().format();
    }

    /**
     * Retrieve User details from Payload and parse to JSON object
     */
    public getUserFromPayload() {
        const token = this.token;
        let payload;
        if (!token)
            return null;
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
    }

    /**
     * Create HTTP request for backend service to register user and save token on success
     * @param registerData 
     */
    public registerUser(registerData): Observable<any> {
        return this.http.post(this.path + '/register', registerData)
            .pipe(map((data: any) => {
                if (data.token) {
                    this.registerToken(data.token);
                }
                return data;
            }
            ), catchError(err => {
                console.log(err)
                return of(err);
            }
            )
            )
    }

    /**
     * Create HTTP request for backend service to validate user login and register token on success
     * @param loginData 
     */
    public loginUser(loginData): Observable<any> {
        return this.http.post<any>(this.path + '/login', loginData)
            .pipe(map((data: any) => {
                if (data.token) {
                    this.registerToken(data.token);
                }
                return data;
            }
            ), catchError(err => {
                console.log(err)
                return of(err);
            }
            )
            )
    }

    private registerToken(token) {
        localStorage.setItem(this.token_key, token)
    }

    /**
     * Remove token from localStorage on user logOut
     */
    public logout() {
        localStorage.removeItem(this.token_key);
    }


    public getCurrentUser(): Observable<any> {
        return this.http.get(this.path + "/users/" + this.token).pipe(map((res) => res));
    }

}