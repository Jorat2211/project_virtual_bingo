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

  private user: User;

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.newUser();
  }

  newUser() {
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
        // console.log(user.id);
        localStorage.setItem('user', JSON.stringify(user));
        swal({
          title: "Welcome",
          text: "You have successfully logged in!",
          icon: "success",
          buttons: {
            showConfirmButton: false,
          }
        })
        window.location.href = 'https://localhost:5001/MainAdmin';
      } else {
        swal("Login", "Email or password incorrect!", "warning")
      }

    }, error => console.error(alert("Email or password incorrect")));
  }

}
