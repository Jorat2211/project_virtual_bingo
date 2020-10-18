import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registry } from './login.interface';

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

  iralaVara(){
    window.location.href = 'https://localhost:5001/Play';
  }
 
NewRandom(){
const min=1;
const max=75;
 console.error(alert(Math.floor(Math.random()*(max-min+1)+min)))
}

  login() {
    this.http.post(this.baseUrl + '/api/login/login', this.user).subscribe((data) => {
      if(data["loginStatus"]){
        window.location.href = 'https://localhost:5001/Play';
      }
      
  }, error => console.error(alert("AQUI FALLA ALGO")));
  }

}




  
