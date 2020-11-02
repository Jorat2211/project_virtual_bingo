import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import swal from 'sweetalert';
import { Room } from './mainadmin.interface';
import { ActivatedRoute } from '@angular/router';
import { User } from './user.interface';


@Component({
  selector: 'app-main-admin',
  templateUrl: './mainadmin.component.html',
  styleUrls: ['./mainadmin.component.css']
})
export class MainAdminComponent {

  private room: Room;
  private rooms: Room[];
  private user: User;
  private logueado: [];

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.userLogueado();
    this.newRoom();
    this.refresh();
  }

  userLogueado() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.logueado['token']);
    console.log(this.logueado['user']['id']);
    console.log(this.logueado['user']['email']);
    console.log(this.logueado['user']['password']);


    this.user = {
      id: this.logueado['user']['id'],
      email: this.logueado['user']['email'],
      password: this.logueado['user']['password'],
    }
  }

  newRoom() {
    this.room = {
      id: -1,
      name: '',
      url: '',
      usersid: -1
    }
  }

  refresh() {
    this.http.get<Room[]>(this.baseUrl + 'api/MainAdmin/' + this.user.id, this.headers()).subscribe(result => {
      this.rooms = result;
    }, error => console.error(error));
  }

  newURL() {
    var name = this.room.name.toLowerCase().trim();
    this.http.get<Room>(this.baseUrl + 'api/MainAdmin/' + this.user.id + "/" + name, this.headers()).subscribe(result => {
      if (name != "") {
        if (name === result.name) {
          this.room.name = "";
          swal("Create Room", "Name already exists!", "warning")
        }
        else
        {
          var url = this.baseUrl + 'MainPlayer/' + name;
          this.http.post<Room>(this.baseUrl + 'api/MainAdmin', {
            name: name,
            url: url,
            usersid: this.user.id,
  
          }, this.headers()).subscribe(result => {
            if (result) {
              this.room.url = url;
              swal("Good job!", "URL generated", "success");
            }
            this.refresh();
            this.room.name = "";
          }, error => console.error(error));
        }
      }
      else {
        swal("Create Room", "Name cannot be empty!", "warning")
      }
    }, error => console.error(error));

  }

  deleteRoom(room: Room) {
    this.http.delete(this.baseUrl + 'api/MainAdmin/' + room.id, this.headers()).subscribe(result => {
      if (result) {
        swal("Good job!", "Room deleted successfully!", "success");
      }
      this.refresh();
    }, error => console.error(error));
  }

  openRoom(room: Room) {
    window.open(room.url); // cambiar mesa
  }

  private headers() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    return {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${this.logueado['token']}` }
    };
  }
}
