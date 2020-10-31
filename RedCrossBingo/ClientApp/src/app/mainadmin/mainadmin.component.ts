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

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.userLogueado();
    this.newRoom();
    this.refresh();
    // console.log(this._route.snapshot.paramMap.get('name'));
  }

  userLogueado() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.user = {
      id: user['id'],
      email: user['email'],
      password: user['password'],
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
    this.http.get<Room[]>(this.baseUrl + 'api/MainAdmin/' + this.user.id).subscribe(result => {
      this.rooms = result;
    }, error => console.error(error));
  }

  newURL() {
    var name = this.room.name.toLowerCase().trim();
    var url = this.baseUrl + 'Room/' + name;
    this.http.post<Room>(this.baseUrl + 'api/MainAdmin', {
      name: name,
      url: url,
      usersid: this.user.id,

    }).subscribe(result => {
      if (result) {
        this.room.url = url;
        swal("Good job!", "URL generated", "success");
      }
      this.refresh();
      this.room.name = "";
    }, error => console.error(error));
  }
}
