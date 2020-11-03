
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

  public bingoNumber: BingoNumber; //Number bingo
  public cards: Array<BingoCard>;  //Cards in room
  public numbers: Array<BingoCardsNumbers>;  // numbers for each cards
  public card: BingoCard; //card bingo 
  public numberChooseTrue: number[]; //numbers get tombola


  public nReceive : number = 0; //new number tombola
  public cantiCards : number = 0; //numbers of cards
  public IsWinner : boolean =  false; //for to know is winner or lose

  private roomId: number; //id rooms 


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

  /**
   * Search ids in session storage and get cards for id
   */ 
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

  /**
   * 
   * @param emoji is face, if is winner is happy, and if is lose is sad
   * @param msj message or winner or loser
   */
  showAler(emoji: string, msj: string){
    swal({
      title: emoji,
      text: msj, 
      buttons: {
        Ok: true,
      }
    });
  }

  /**
   * Search in card number receive and update isSelected
   * @param number receive get of tombola
   */
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
/**
 * send message to players 
 */
sendMenssageWinner(){
  this.http.post<string> (this.baseUrl + 'api/SendMessage', {
    isWinner : !this.IsWinner
  }).subscribe(result => {
  }, error => console.error(error));
}
/**
 * Cheking numbers of cards if isSelected alls 
 * @param card to check if he is a winner
 */
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

/**
 * update number in the db
 * @param number to update
 */
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
/**
 * Initialize number of card
 */
  newCardNumber() {
    this.bingoNumber = {
      id: -1,
      number: 0,
      isChosen: false,
      roomsId: -1
    }
}

/**
 * search cardbingo in the db for id
 * @param id_card to get in the db
 */
 getCard(id_card : number){
  this.http.get<BingoCard>(this.baseUrl + 'api/Bingocards/'+id_card).subscribe(result => {
    this.cards.push(result); 
  }, error => console.error(error));
 }
/**
 * get numbers already 
 * played in the tombola
 */
  getNumbersTrue() {
    this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
      result.forEach(element => {
        this.numberChooseTrue.push(element.number);
      });
    }, error => console.error(error));
  }
/**
 * get id room 
 */
  idRoom() {
    this.http.get<Room>(this.baseUrl + 'api/Bingocards/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
      this.roomId = Number(result);
      console.log(this.roomId);
    })
  }

}
