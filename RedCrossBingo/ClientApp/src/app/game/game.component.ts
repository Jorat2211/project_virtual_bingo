
import { Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCardsNumbers} from './bingocardnumbers.interface';
import {BingoCard} from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent  {
  public roomsId = 3; 

  public bingoNumber : BingoNumber;

  public cards : Array<BingoCard>; 
  public numbers : Array<BingoCardsNumbers>; 

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
      this.getCards(); 
   }



   //This method is only test, for to see numbers and cards
 paintNumbers(){
   if(this.cards){
     this.numbers = []; 
      this.cards.forEach(card=> {
        card.bingoCardNumbers.forEach(e => {
        let num = new BingoCardsNumbers().convertToBingoCardsNumbers(e); 
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
  roomsId: 3

  }
}

save(){
  if(this.bingoNumber.id > 0){
    //update
    this.http.put<BingoNumber>(this.baseUrl +'api/Bingonumber/'+this.bingoNumber.id, this.bingoNumber).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }
  //Insert
     this.http.post<BingoNumber> (this.baseUrl + 'api/Bingonumber', {
      number : this.bingoNumber.number,
      IsChosen : this.bingoNumber.isChosen,
      RoomsId : this.bingoNumber.roomsId
    }).subscribe(result => { 
      console.log(result); 
  }, error => console.error(error));
}

generateNumberTombola(){
  this.newBingoNumber(); 
  for (var i = 1; i < 76; i++)
  {  
     this.bingoNumber.number = i; 
     this.save(); 
  }
}


  newRandom() {
    const min = 1;
    const max = 75;
    document.getElementById("number").innerHTML=Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
 
}
