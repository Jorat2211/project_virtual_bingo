import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import swal from 'sweetalert';
import { Room } from './mainadmin.interface';
import { User } from './user.interface';
import { Router } from '@angular/router';


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

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private Router: Router) {
    this.userLogueado();
    this.newRoom();
    this.refresh();
  }

  /**
   * User logueado
   */
  userLogueado() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.logueado['token']);
    this.user = {
      id: this.logueado['user']['id'],
      email: this.logueado['user']['email'],
      password: this.logueado['user']['password'],
    }
  }

  /**
   * Initialize a new room
   */
  newRoom() {
    this.room = {
      id: -1,
      name: '',
      url: '',
      usersid: -1
    }
  }

  /**
   * Method in charge of refresh the page (table)
   */
  refresh() {
    this.http.get<Room[]>(this.baseUrl + 'api/MainAdmin/' + this.user.id, this.headers()).subscribe(result => {
      this.rooms = result;
    }, error => console.error(error));
  }

  /**
   * Method in charge of generate a new URL
   */
  newURL() {
    var name = this.room.name.toLowerCase().trim().replace(/ /g, "");
    this.http.get<Room>(this.baseUrl + 'api/MainAdmin/' + this.user.id + "/" + name, this.headers()).subscribe(result => {
      if (name != "") {
        if (name === result.name) {
          this.room.name = "";
          swal("Create Room", "Name already exists!", "warning")
        }
        else {
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

  /**
   * Method in charge of delete a specific room
   */
  deleteRoom(room: Room) {
    this.http.delete(this.baseUrl + 'api/MainAdmin/' + room.id, this.headers()).subscribe(result => {
      if (result) {
        swal("Good job!", "Room deleted successfully!", "success");
      }
      this.refresh();
    }, error => console.error(error));
  }

  /**
   * Method in charge of open a specific room (Admin Main Tombola)
   */
  openRoom(room: Room) {
    var urlGameAdmin = this.baseUrl + "MainTombola/" + room.name;
    window.open(urlGameAdmin);
  }

  /**
   * Method in charge of logout
   */
  logout() {
    sessionStorage.clear();
    this.Router.navigate(['/Login']);
  }

  /**
   * method in charge of validating the access token
   */
  private headers() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    return {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${this.logueado['token']}` }
    };
  }
}
