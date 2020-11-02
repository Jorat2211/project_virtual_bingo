
import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCardsNumbers} from './bingocardnumbers.interface';
import {BingoCard} from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import {SignalServiceService} from './../services/signal-service.service'; 
import { empty } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent  implements OnInit {
  public roomsId = 6; 

  public bingoNumber : BingoNumber; //Number bingo
  public cards : Array<BingoCard>;  //Cards in room
  public numbers : Array<BingoCardsNumbers>;  // numbers for each cards
  public card : BingoCard; //card bingo 
  public numberChooseTrue: number[];


  public nReceive : number = 0; 

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
        this.nReceive = r.number; 
       this.updateNumberIsSelected(r.number); 
      console.log(this.cards); 
     });
  }




updateNumberIsSelected(number: Number){
  this.cards.forEach(card => {
    card.bingoCardNumbers.forEach(numberCard=> {

      if(number == numberCard.number){
        console.log("Number before update: " + numberCard); 
        numberCard.isSelected = true; 
        var r = new BingoCardsNumbers().convertToBingoCardsNumbers(numberCard); 
        console.log("Number after update: " + numberCard); 
        r.isSelected = true; 
        this.updateCardNumber(r);
      }
    });
  });

}

updateCardNumber(number : BingoCardsNumbers){
  let BingN : BingoCardsNumbers = number; 
  if(number.id > 0){
    //update
    this.http.put<BingoCardsNumbers>(this.baseUrl +'api/Bingocardnumbers/'+number.id, number).subscribe(result=>{
      result = result as BingoCardsNumbers; 
      console.log("Result numero: "+result); 
      BingN = result; 
    }, error=>console.error(error));
  }
  return BingN; 
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


getNumbersTrue(){
  this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
    result.forEach(element => {
      this.numberChooseTrue.push(element.number);
    });
  }, error => console.error(error));

}

}
