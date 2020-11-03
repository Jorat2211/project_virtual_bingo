import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './login.interface';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  private user: User;
  private logueado: [];

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private Router: Router) {
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
        var user = data;
        sessionStorage.setItem('user', JSON.stringify(user));
        swal({
          title: "Welcome",
          text: "You have successfully logged in!",
          icon: "success",         
          buttons: {
            Ok: true,
          }
        })
        // window.location.href = 'https://localhost:5001/MainAdmin';
        this.Router.navigate(['/MainAdmin']);
      }

    }, error => console.error(swal("Login", "Email or password incorrect!", "warning")));
  }
}
