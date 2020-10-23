import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 

  }

generateNumber(){
  var i= 1;
  for (var i = 1; i < 76; i++)
  {
    console.log(i);    
  }
}


  newRandom() {
    const min = 1;
    const max = 75;
    document.getElementById("number").innerHTML=Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
 
}
