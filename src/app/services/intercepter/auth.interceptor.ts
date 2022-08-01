import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonServiceService } from '../common-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private commonService:CommonServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.commonService.isAuthenticated(request.url)){
      request.clone({
        setHeaders:{
          Authorization:`Bearer ${this.commonService.getAccessToken()}`
        } 
      })

    }
    return next.handle(request);
  }
}
