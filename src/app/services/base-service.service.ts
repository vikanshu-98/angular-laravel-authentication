import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger'; 
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class BaseServiceService{
  
  constructor(private _http:HttpClient,public logger:NGXLogger,public route:Router) { }

  makePostRequest(fullurl:string,body:any,headers:HttpHeaders){
    var fullurl= fullurl;
    if(!fullurl.startsWith('http'))
    {
      fullurl = environment.baseUrlDev+fullurl;
    } 
    return this._http.post(fullurl,body, {headers:headers,withCredentials:true,observe:'response'} ); 
  }
  makeGetRequest(fullUrl:string,headers:HttpHeaders){
    var fullurl= fullUrl;
    if(!fullUrl.startsWith('http'))
    {
      fullurl = environment.baseUrlDev+fullurl;
    }
    const httpOption = {headers:headers,withCredentials:true};
    return this._http.get(fullurl,httpOption);
  }

  extractData(res){
    let body,contentType;
    if(res.status!=401){ 
      if(res.headers){
        contentType = res.headers.get('Content-type')
        if(!contentType){
          if(res.headers){
            contentType = res.headers.get('content-type')
          
          }
        }

        body= res.body
        if(body && body.message && body.code){
          if(body.code!=1000){
            this.logger.error('Un exprected error')
          } 
        }

        if(contentType){
          if(contentType.startsWith('application/json') || contentType.startsWith('text/html')){
            body= res.body
          }else{
            this.logger.error('Received Non-JSON Response')
          }
        }
      }
    }else{
      body=res.body
      if(body.code==4001 && body.success==false){ 
        this.logger.error(body.message);
        this.route.navigateByUrl('/login')
      }
    }
    return body;
  }
  errorTemplate(e:any):any{
    if(e instanceof HttpResponse && window.location.origin!='localhost'){ 
      this.logger.error('Error with response object, probably CORS from Logout redirection.: ' + e);
      window.location.reload();
    }else{
      this.logger.error(e);
      return throwError(new Error(`${e.status} ${e.statusText}`))
    }
}
}

