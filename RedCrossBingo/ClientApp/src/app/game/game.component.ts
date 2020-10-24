
import { Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCardsNumbers} from './bingocardnumbers.interface';
import {BingoCard} from './bingocards.interface';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent  {
  public roomsId = 2; 
  public cards : BingoCard[]; 
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
   }



getCards(){
  console.log(this.baseUrl + 'api/Bingocards/'+this.roomsId);
    this.http.get<BingoCard[]>(this.baseUrl + 'api/Bingocards/'+this.roomsId).subscribe(result => {
      this.cards = result;
      console.log(this.cards); 

    }, error => console.error(error));
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
