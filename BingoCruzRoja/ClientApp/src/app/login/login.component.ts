import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registry } from './login.interface';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   user: Registry;
  
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 
     this.user = {
       email: "",
       password:""
        };
  }

 
NewRandom(){
const min=1;
const max=75;
 console.error(alert(Math.floor(Math.random()*(max-min+1)+min)))
}

  login() {
    this.http.post(this.baseUrl + 'api/Registry/login', this.user).subscribe((data) => {
      if(data){
       swal("Welcome","You have successfully logged in!","success");
        window.location.href = 'https://localhost:5001/fetch-data';
      }else{
        swal("Login","Email or ppassword incorrect!","warning")
      }
      
  }, error => console.error(alert("Email or ppassword incorrect")));
  }

}




  
