import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import { AuthenticationService } from './authentication.service'

@Injectable()
/**
 *  Authentication interceptor class attaches token in the header with every request
 */
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private injector: Injector) {}

    intercept(req, next) {
        var authentication = this.injector.get(AuthenticationService)
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'jwt-token ' + authentication.token),
        })
        
        return next.handle(authRequest)
    }
}