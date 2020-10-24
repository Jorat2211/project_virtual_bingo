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
  public cards : Array<BingoCard>; 
  public card : BingoCard; 
  public number : BingoCardsNumbers; 
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.getCards(); 
   }



 paintNumbers(){
   if(this.cards){
      this.cards.forEach(element => {
        console.log(element); 
        this.card = element as BingoCard; 
       this.card.bingoCardNumbers.forEach(e => {
        
       });
      });
   }
 }  

getCards(){
  console.log(this.baseUrl + 'api/Bingocards/'+this.roomsId);
    this.http.get<BingoCard[]>(this.baseUrl + 'api/Bingocards/'+this.roomsId).subscribe(result => {
      this.cards = result; 
    }, error => console.error(error));
}

}
