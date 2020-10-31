import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import swal from 'sweetalert';
import { Room } from './mainadmin.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-admin',
  templateUrl: './mainadmin.component.html',
  styleUrls: ['./mainadmin.component.css']
})
export class MainAdminComponent {

  private room: Room;
  private rooms: Room[];
  
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute) {
    this.newRoom();
    this.refresh();
    console.log(this._route.snapshot.paramMap.get('name'));
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
    this.http.get<Room[]>(this.baseUrl + 'api/MainAdmin/4').subscribe(result => {
      this.rooms = result;
    }, error => console.error(error));
  }

  newURL() {
    var url = 'https://localhost:5001/Room/' + this.room.name;
      this.http.post<Room>(this.baseUrl + 'api/MainAdmin', {
        name: 'mesa1',
        url: url,
        usersid: 1,

      }).subscribe(result => {
        if (result) {
          this.room.url = url;
          swal("Good job!", "URL generated", "success");
        }
        // this.refresh();
      }, error => console.error(error));
  }
}
