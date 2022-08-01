


class Register{
    public email:string;
    public password:string;
    constructor(){
        this.email='';
        this.password='';
    }
}

class ObjectApi{  
    public register:Register;
   constructor(){
     this.register=new Register()
   }
   Register(){
    return this.register;
   }

}


export class BaseRequest {
    public RequestBody; 
    constructor(){
         this.RequestBody = new ObjectApi();

     }
    // get RequestBody(){
    //  return this.Register();
    // }
 
}
