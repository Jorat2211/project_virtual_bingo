import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {BingoCard} from './bingocards.interface';
import { BingoCardsNumbers } from './bingocardnumbers.interface';

@Component({
  selector: 'app-mainplayer',
  templateUrl: './mainplayer.component.html',
  styleUrls: ['./mainplayer.component.css']
})
export class MainplayerComponent {
  public cant : number; 
  public card : BingoCard; 
  public cardNumbers: BingoCardsNumbers; 
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 
    this.cant = 0; 
    this.newCard();
  }

//C:\Web2\practicabd\angular\Animals\ClientApp\src\app\paperboard
  createCards(){
    for (let i = 0; i < this.cant; i++) {
      this.saveBingoCards(); 
      this.newCard(); 
    }
  }


newCard(){
  this.card = {
    id : 0,
    rooms_id : 4 //Este id es default, debe cambiarse
  }
}


newCardNumbers(){
  this.cardNumbers = {
    id : 0,
    BingoCardsId : 0,
    number: 0,
    IsSelected: false
  }
}

saveBingoCards(){
  if(this.card.id > 0){
    //update
    this.http.put<BingoCard>(this.baseUrl +'api/Bingocards'+this.card.id, this.card).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }

  //Insert
  this.http.post<BingoCard> (this.baseUrl + 'api/Bingocards', {
   RoomsId : this.card.rooms_id
  }).subscribe(result => {
    this.newCardNumbers(); 
    result = result as BingoCard; 
    this.cardNumbers.BingoCardsId = result.id; 
    this.generateNumbers();
  }, error => console.error(error));
}


generateNumbers(){
  let list = [];
  let num = this.getRamdon();
  for(let i = 0; i < 25; i++){
      while(!this.isSame(num, list)){
          num = this.getRamdon();
      }
      list.push(num); 
      this.cardNumbers.number = num; 
      this.saveBingoCardsNumbers(); 
      num = this.getRamdon();
  }
}

getRamdon(){
  const min=1;
  const max=75;
  return  Math.floor(Math.random()*(max-min+1)+min);
}

isSame(num,  list: number[]){
 for (let i = 0; i< list.length; i++) {
    if(num == list[i]){
      return false; 
    }
 }
return true;
}


saveBingoCardsNumbers(){
  if(this.cardNumbers.id > 0){
    //update
    this.http.put<BingoCard>(this.baseUrl +'api/Bingocardnumbers'+this.cardNumbers.id, this.cardNumbers).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }

  //Insert
  this.http.post<BingoCardsNumbers> (this.baseUrl + 'api/Bingocardnumbers', {
    number: this.cardNumbers.number,
    IsSelected : this.cardNumbers.IsSelected,
    BingoCardsId : this.cardNumbers.BingoCardsId
  }).subscribe(result => {
  }, error => console.error(error));
}

}

