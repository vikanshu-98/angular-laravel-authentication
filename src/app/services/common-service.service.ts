
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseServiceService } from './base-service.service';
import { headers,BaseUrl, ApiEndpoint } from './constants/api-enums';
import { BaseRequest } from './model/base-request.model';
import { Observable, throwError } from 'rxjs'; 
 

export class CommonServiceService extends BaseServiceService{
  postRequest(url:string,data:any):Observable<any>{
    var fullurl= environment.baseUrlDev+BaseUrl.BASEAPIURL+url; 
    return super.makePostRequest(fullurl,data,headers).pipe(map(this.extractResponse),catchError(this.errorTemplate));
  }
 
  getRequest(url:string){

  }

  extractResponse(res){
    return res.body;
  }

  getAccessToken(){
    const LoggedInUserArray = localStorage.getItem('LoggedInDetals'); 
    if(LoggedInUserArray){
      const LoggedInUserObj=JSON.parse(LoggedInUserArray); 
      return LoggedInUserObj?.access_token;   
    }
  }
  getLoggedInUserName(){
    const LoggedInUserArray = localStorage.getItem('LoggedInDetals'); 
    if(LoggedInUserArray){
      const LoggedInUserObj=JSON.parse(LoggedInUserArray); 
      return LoggedInUserObj?.users.name;   
    }
  }

  isUserLogin(){
    const token = this.getAccessToken;
    if(token){
      return true;
    }else{
      return false;
    }
  }
  setRefreshToken(){
    setInterval(()=>{
      if(this.isUserLogin){
        const token = this.getAccessToken();
        console.log(headers);
        this.getRequest(ApiEndpoint.refreshToken);
      }
    },(10000))
  }



  isAuthenticated(url:string){
    if(this.isUserLogin()){
      if(url.indexOf("/api/")>0){
        url =url.substr(url.indexOf("/api/") + 5,url.length); 
        if(Object.values(ApiEndpoint).find(value=>url===value)) {
          return true;
        }
      }
      return false;
    }
     return false;
  }
}