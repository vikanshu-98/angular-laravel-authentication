import { HttpHeaders } from "@angular/common/http";

export class ApiEnum{}


export enum BaseUrl{
    BASEAPIURL='/api/'
}


export enum ApiEndpoint{
    login='loggedUserIn',
    register='register',
    refreshToken = 'refreshToken'
}

export let headers:HttpHeaders= new HttpHeaders({
    'Content-Type':'Application/json',  
    
})




