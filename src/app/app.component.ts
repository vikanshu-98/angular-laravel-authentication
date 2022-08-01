import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { of, pipe,from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiEndpoint, BaseUrl, headers } from './services/constants/api-enums';
import { BaseRequest } from './services/model/base-request.model';
import { BaseServiceService } from './services/base-service.service';
import { OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; 
import { CommonServiceService } from './services/common-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  baseRequest:BaseRequest = new BaseRequest(); 
  constructor(private logger:NGXLogger,private _http:HttpClient,public baseService:BaseServiceService,private bnIdle: BnNgIdleService,private commonService:CommonServiceService){ 
  }
  ngOnInit():void{
    let url:string = 'http://127.0.0.1:8000/api/refreshToken';
    
    url =url.substr(url.indexOf("/api/") + 5,url.length);
   if(Object.values(ApiEndpoint).find(value=>url===value)) {
    console.log('sd')
   } 
   else{
    console.log('sdsds');
   }
    
    // if(this.commonService.isUserLogin()){ 
    //   this.checkUserIdleAfterLogedIn();
    // }
  }  
  

  checkUserIdleAfterLogedIn():void{ 
    this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
      } 
    });
    
    this.commonService.setRefreshToken();
  }
 
  

}
