
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
  public roomsId = 2; 

  public cards : BingoCard[]; 
  public bingoNumber : BingoNumber;

  public cards : Array<BingoCard>; 
  public card : BingoCard; 
  public number : BingoCardsNumbers; 

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.getCards(); 
   }



 paintNumbers(){
   if(this.cards){
      this.cards.forEach(element => {

        this.card = element as BingoCard; 
       this.card.bingoCardNumbers.forEach(e => {
         e = e as BingoCardsNumbers;
         console.log(e); 
         console.log("Numero: " +e.number + " de mi carton: " +e.BingoCardsId);
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
  is_chosen:false,
  rooms_id: 2

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
   RoomsId : this.bingoNumber.rooms_id,
   number : this.bingoNumber.number,
   IsChosen : this.bingoNumber.is_chosen
   

  }).subscribe(result => { 
  console.log(result);
  }, error => console.error(error));
}

generateNumberTombola(){
  var i= 1;
  this.newBingoNumber();
  for (var i = 1; i < 76; i++)
  {   
   this.bingoNumber.number=i; 
   this.save();   
   this.newBingoNumber();
  }
}


  newRandom() {
    const min = 1;
    const max = 75;
    document.getElementById("number").innerHTML=Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
 
}
