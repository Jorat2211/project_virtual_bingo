import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCard} from './bingocards.interface';
import { BingoCardsNumbers } from './bingocardnumbers.interface';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../mainadmin/mainadmin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainplayer',
  templateUrl: './mainplayer.component.html',
  styleUrls: ['./mainplayer.component.css']
})

export class MainplayerComponent {
  public cant : number; 
  public card : BingoCard; 
  public cardNumbers: BingoCardsNumbers; 

  private roomsId = 0; 
  private maxNumberCard = 0; 
  private roomId: number;

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute,  private Router: Router) { 
    this.idRoom();
    this.cant = 0; 
    this.newCard();
    this.getCardsMax();
  }

  createCards(){
    this.getCardsMax(); 
    let contador = this.maxNumberCard; 
    for (let i = 0; i < this.cant; i++) {
      this.saveBingoCards(contador); 
      this.newCard(); 
      contador++; 
    }
    this.getCardsMax(); 
    this.saveCardIdInSession(this.cant); 
    this.Router.navigate(['/Game/' + this._route.snapshot.paramMap.get('roomname')]); 
  }

  getCardsMax(){
      this.http.get<number>(this.baseUrl + 'api/Bingocards/max/'+this.roomsId).subscribe(result => {
        this.maxNumberCard = result+1; 
      }, error => console.error(error));
  }

newCard(){
  this.card = {
    id : 0,
    isPlaying: false,
    numberCard: 0,
    rooms_id : this.roomId
  }
}


newCardNumbers(){
  this.cardNumbers = {
    id : 0,
    bingoCardsId : 0,
    number: 0,
    isSelected: false
  }
}

saveBingoCards(contador){
  if(this.card.id > 0){
    this.http.put<BingoCard>(this.baseUrl +'api/Bingocards'+this.card.id, this.card).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }
  console.log("ID de sala: " + this.card.rooms_id);
  this.http.post<BingoCard> (this.baseUrl + 'api/Bingocards', {
   RoomsId : this.card.rooms_id,
   NumberCard: contador
  }).subscribe(result => {
    this.newCardNumbers(); 
    result = result as BingoCard; 
    this.cardNumbers.bingoCardsId = result.id; 
    this.saveIdCardInSessionStorage(result.id); 
    this.generateNumbers();
  }, error => console.error(error));
}

saveCardIdInSession(cantidad: number){
  sessionStorage.setItem("cantidad",JSON.stringify(cantidad)); 
}

generateNumbers(){
  let list = [];
  let num = this.getRamdon();
  for(let i = 0; i < 25; i++){
      while(list.includes(num)){
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
    isSelected : this.cardNumbers.isSelected,
    bingoCardsId : this.cardNumbers.bingoCardsId
  }).subscribe(result => {
  }, error => console.error(error));
}

saveIdCardInSessionStorage(id_card: number){
  let values = JSON.parse(sessionStorage.getItem("listCards"));
  let data ; 
    if(values){    
        data= values; 
        if(!data.values.includes(id_card)){
          data.values = [...data.values, id_card]
        }
     }else{
      data = {values: [id_card]}

     }
    sessionStorage.setItem("listCards", JSON.stringify(data)); 
 }
idRoom() {
<<<<<<< HEAD
  this.http.get<Room>(this.baseUrl + 'api/Bingocardnumbers/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
=======
  this.http.get<Room>(this.baseUrl + 'api/Bingonumber/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
    console.log("Result : " + result); 
>>>>>>> 1621a358d99708f10896d0ad841bd851de5e2ef5
    this.roomId = Number(result);
    console.log(this.roomId);
  })
}

}

