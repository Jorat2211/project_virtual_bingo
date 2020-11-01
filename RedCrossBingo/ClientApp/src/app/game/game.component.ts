
import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCardsNumbers} from './bingocardnumbers.interface';
import {BingoCard} from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import {SignalServiceService} from './../services/signal-service.service'; 
import { send } from 'process';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent  implements OnInit {
  public roomsId = 1; 

  public bingoNumber : BingoNumber; //Number bingo
  public cards : Array<BingoCard>;  //Cards in room
  public numbers : Array<BingoCardsNumbers>;  // numbers for each cards
  public card : BingoCard; //card bingo 
 // public number : BingoCardsNumbers; 
  private numberChooseTrue: number[];

  private numberReceives : BingoNumber[] = []; 

  constructor( private service : SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.getCards(); 
    this.newCardNumber();
    this.numberChooseTrue = [];
    this.paintNumbers(); 
    this.getNumbersTrue();
   }

   ngOnInit(): void {
    this.service.eNotificarNumber.subscribe((numberReceive) =>{
      var r  = numberReceive as BingoNumber; 
        this.numberChooseTrue.push(r.number); 
       this.numberReceives.push (numberReceive); 
       //Search number for each card and update in the db
     });
  }


verNum(){
  console.log(this.numberReceives); 
}

  newCardNumber(){
    this.bingoNumber={
      id:-1,
      number: 0,
      isChosen:false,
      roomsId:-1
     
    }
  }


   //This method is only test, for to see numbers and cards
 paintNumbers(){
   if(this.cards){
     this.numbers = []; 
      this.cards.forEach(card=> {
        card.bingoCardNumbers.forEach(e => {
        let num = new BingoCardsNumbers().convertToBingoCardsNumbers(e); 
        console.log(num); 
        this.numbers.push(num); 
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

newBingoNumber(){
  this.bingoNumber = {
  id:0,
  number: 0,
  isChosen:false,
  roomsId:1 //Este id es default, debe cambiarse
  }
}

save(){
  //Insert
     this.http.post<BingoNumber> (this.baseUrl + 'api/Bingonumber', {
      number : this.bingoNumber.number,
      IsChosen : this.bingoNumber.isChosen,
      RoomsId : this.bingoNumber.roomsId
    }).subscribe(result => { 
      console.log(result); 
  }, error => console.error(error));
}

getNumbersTrue(){
  this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
    result.forEach(element => {
      this.numberChooseTrue.push(element.number);
    });
  }, error => console.error(error));

}

}
