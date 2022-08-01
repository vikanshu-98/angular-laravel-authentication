import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private commonService:CommonServiceService) { }
  loggedUserName:string = '';
  ngOnInit(): void {
    this.loggedUserName = this.commonService.getLoggedInUserName();

  }
  getAccessToken(){
   
  }

}
