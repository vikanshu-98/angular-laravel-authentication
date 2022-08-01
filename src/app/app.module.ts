import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerModule,NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment'; 
import { HttpClientModule,HttpInterceptor } from '@angular/common/http';
import { LoginComponent } from './login/login.component'; 
import { HeaderComponent } from './common/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/intercepter/auth.interceptor';  
import { CommonServiceService } from './services/common-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    HeaderComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoggerModule.forRoot({
      level:environment.logLevel,
      serverLogLevel:environment.logLevel,

    }),
  
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
