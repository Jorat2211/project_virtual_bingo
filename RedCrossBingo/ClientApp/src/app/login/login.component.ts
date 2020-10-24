import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './login.interface';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User;

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.user = {
      id: -1,
      email: "",
      password: ""
    };
  }

  login() {
    this.http.post(this.baseUrl + 'api/User/login', this.user).subscribe((data) => {
      if (data) {
        var user = data as User;
        console.log(user.id);
        swal("Welcome", "You have successfully logged in!", "success");

        
         window.location.href = 'https://localhost:5001/Game';

        //window.location.href = 'https://localhost:5001/MainAdmin';

      } else {
        swal("Login", "Email or ppassword incorrect!", "warning")
      }

    }, error => console.error(alert("Email or ppassword incorrect")));
  }

}
