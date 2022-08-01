import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
import { ApiEndpoint } from '../services/constants/api-enums';
import { BaseRequest } from '../services/model/base-request.model';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email='';
  password='';
  
  baseRequest:BaseRequest = new BaseRequest();
  constructor(public commonService:CommonServiceService,private logger:NGXLogger,private route:Router) { }

  ngOnInit(): void {
  }

  loginFormSubmit(value:any){ 
    this.baseRequest.RequestBody.register.email=value.email
    this.baseRequest.RequestBody.register.password=value.password
    this.commonService.postRequest(ApiEndpoint.login,this.baseRequest.RequestBody.register).subscribe((response)=>{
      if(response){ 
        try{ 
          if(response.message=="success" && response.code==1000){ 
             
            localStorage.setItem('LoggedInDetals',JSON.stringify(response.data));
            this.route.navigateByUrl('/')
          } 
        }catch(e){
          this.logger.error(e);
        }
        
      }
    });
  }

}
