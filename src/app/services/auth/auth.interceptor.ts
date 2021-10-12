import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthStorageService} from './auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authStorageService: AuthStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authStorageService.getAuthToken();

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
