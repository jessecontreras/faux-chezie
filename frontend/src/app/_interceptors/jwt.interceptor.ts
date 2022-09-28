import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.api);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        /* setHeaders: {
          Authorization: `Bearer ${user.token}`,
          
        },*/
        headers: request.headers
          .set('Cache-Control', 'no-cache, no-store, must-revalidate')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0')
          .set('Authorization', `Bearer ${user.token}`),
      });
    }

    return next.handle(request);
  }
}
