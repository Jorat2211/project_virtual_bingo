
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BingoCardsNumbers } from './bingocardnumbers.interface';
import { BingoCard } from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import {SignalServiceService} from './../services/signal-service.service'; 
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../mainadmin/mainadmin.interface';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent  implements OnInit{
  public roomsId = 0; 

  public bingoNumber: BingoNumber; //Number bingo
  public cards: Array<BingoCard>;  //Cards in room
  public numbers: Array<BingoCardsNumbers>;  // numbers for each cards
  public card: BingoCard; //card bingo 
  public numberChooseTrue: number[];


  public nReceive : number = 0; 
  public cantiCards : number = 0; 
  public IsWinner : boolean =  false; 

  private roomId: number;


  constructor(private service: SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute) {
    //this.getCards(); 
    this.idRoom(); 
    this.cards = []; 
    this.newCardNumber();
    this.numberChooseTrue = [];
    this.getNumbersTrue();
    this.getCantCards();
    this.idRoom();

  
   }

  getCantCards(){
    let ids= JSON.parse(sessionStorage.getItem("listCards")); 
    if(ids.values){
      let list = ids.values as number[]; 
      for (let i = 0; i <list.length; i++) {
          this.getCard(list[i]); 
      }
    }
  }

   ngOnInit(): void {
    this.service.eNotificarNumber.subscribe((numberReceive) =>{
      var r  = numberReceive as BingoNumber; 
        this.numberChooseTrue.push(r.number); 
        this.nReceive = r.number; 
       this.updateNumberIsSelected(r.number); 
       
     });
     this.service.isWinnerNitifica.subscribe((result)=>{
       if(!result && !this.IsWinner){
        let emojiSad  = "😔"; 
        this.showAler(emojiSad, "Game Over\nGood Luck for next time!"); 
      }else if(!result && this.IsWinner){
        let emojiHappy = "😎";
        this.showAler(emojiHappy, "You are the winner!"); 
      }
     });
  }

  showAler(emoji: string, msj: string){
    swal({
      title: emoji,
      text: msj, 
      buttons: {
        Ok: true,
      }
    });
  }

  updateNumberIsSelected(number: Number) {
    this.cards.forEach(card => {
      card.bingoCardNumbers.forEach(numberCard => {
      if(number == numberCard.number){
        numberCard.isSelected = true; 
        var r = new BingoCardsNumbers().convertToBingoCardsNumbers(numberCard); 
        r.isSelected = true; 
        this.updateCardNumber(r);
        if(this.isWinner(card)){
          this.IsWinner = true; 
          this.sendMenssageWinner();
        } 
      }
    });
  });
}

sendMenssageWinner(){
  this.http.post<string> (this.baseUrl + 'api/SendMessage', {
    isWinner : !this.IsWinner
  }).subscribe(result => {
  }, error => console.error(error));
}

isWinner(card : BingoCard){
  let isWinner = true; 
  card.bingoCardNumbers.forEach(number => {
    if(!number.isSelected){
      isWinner =  false; 
      return; 
    }
  });
  return isWinner; 
}

updateCardNumber(number : BingoCardsNumbers){
  let BingN : BingoCardsNumbers = number; 
  if(number.id > 0){
    //update
    this.http.put<BingoCardsNumbers>(this.baseUrl +'api/Bingocardnumbers/'+number.id, number).subscribe(result=>{
      result = result as BingoCardsNumbers; 
      BingN = result; 
    }, error=>console.error(error));
  }
  return BingN;
}

  newCardNumber() {
    this.bingoNumber = {
      id: -1,
      number: 0,
      isChosen: false,
      roomsId: -1
    }
}

 getCard(id_card : number){
  this.http.get<BingoCard>(this.baseUrl + 'api/Bingocards/'+id_card).subscribe(result => {
    this.cards.push(result); 
  }, error => console.error(error));
 }

  getNumbersTrue() {
    this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
      result.forEach(element => {
        this.numberChooseTrue.push(element.number);
      });
    }, error => console.error(error));
  }

  idRoom() {
    this.http.get<Room>(this.baseUrl + 'api/Bingocards/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
      this.roomId = Number(result);
      console.log(this.roomId);
    })
  }

}
