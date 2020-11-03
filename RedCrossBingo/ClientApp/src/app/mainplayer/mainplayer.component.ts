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
  public cant : number;  //numbers of card bingo chosen 
  public card : BingoCard; //card bingo
  public cardNumbers: BingoCardsNumbers; //number for card 

  private maxNumberCard = 0; //max number of card
  private roomId: number; //id room

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute,  private Router: Router) { 
    this.roomId = 0; 
    this.idRoom();
    this.cant = 0; 
    this.newCard();
    this.getCardsMax();
  }

  /** 
   * Create cards bingo
   */
  createCards(){
    this.getCardsMax(); 
    let contador = this.maxNumberCard; 
    for (let i = 0; i < this.cant; i++) {
      this.saveBingoCards(contador); 
      this.newCard(); 
      contador++; 
    }
    this.getCardsMax(); 
    this.Router.navigate(['/Game/' + this._route.snapshot.paramMap.get('roomname')]); 
}
  /**
   * Get max card
   */
  getCardsMax(){
      this.http.get<number>(this.baseUrl + 'api/Bingocards/max/'+this.roomId).subscribe(result => {
        this.maxNumberCard = result+1; 
      }, error => console.error(error));
  }
/**
 * Initialize card
 */
newCard(){
  this.card = {
    id : 0,
    isPlaying: false,
    numberCard: 0,
    rooms_id : this.roomId
  }
}
/**
 * Number of card
 */
newCardNumbers(){
  this.cardNumbers = {
    id : 0,
    bingoCardsId : 0,
    number: 0,
    isSelected: false
  }
}

/**
 * save new card in the db, and also update card
 * @param contador number of card bingo
 */
saveBingoCards(contador){
  if(this.card.id > 0){
    this.http.put<BingoCard>(this.baseUrl +'api/Bingocards'+this.card.id, this.card).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }

  this.http.post<BingoCard> (this.baseUrl + 'api/Bingocards', {
   RoomsId : this.roomId,
   NumberCard: contador
  }).subscribe(result => {
    this.newCardNumbers(); 
    result = result as BingoCard; 
    this.cardNumbers.bingoCardsId = result.id; 
    this.generateNumbers();
    this.saveIdCardInSessionStorage(result.id); 
  }, error => console.error(error));
}

/**
 * Generate numbers for each card, numbers is ramdom
 */
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

/**
 * Get number of ramdon in range 1 to 75
 */
getRamdon(){
  const min=1;
  const max=75;
  return  Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Save number in the db 
 */
saveBingoCardsNumbers(){
  if(this.cardNumbers.id > 0){
    this.http.put<BingoCard>(this.baseUrl +'api/Bingocardnumbers'+this.cardNumbers.id, this.cardNumbers).subscribe(result=>{
    }, error=>console.error(error));
    return;
  }

  this.http.post<BingoCardsNumbers> (this.baseUrl + 'api/Bingocardnumbers', {
    number: this.cardNumbers.number,
    isSelected : this.cardNumbers.isSelected,
    bingoCardsId : this.cardNumbers.bingoCardsId
  }).subscribe(result => {
  }, error => console.error(error));
}

/**
 * save id the card in the session storage for to use
 * @param id_card id of card
 */
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

/**
 * Get id of room
 */
idRoom() {
  this.http.get<Room>(this.baseUrl + 'api/Bingocardnumbers/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
    this.roomId = Number(result);
  })
}

}

