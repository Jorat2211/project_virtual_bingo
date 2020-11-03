
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BingoCardsNumbers } from './bingocardnumbers.interface';
import { BingoCard } from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
<<<<<<< HEAD
import {SignalServiceService} from './../services/signal-service.service'; 
import swal from 'sweetalert';
=======
import { SignalServiceService } from './../services/signal-service.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../mainadmin/mainadmin.interface';
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

<<<<<<< HEAD
export class GameComponent  implements OnInit{
  public roomsId = 10; 
=======
export class GameComponent implements OnInit {
  public roomsId = 6;
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad

  public bingoNumber: BingoNumber; //Number bingo
  public cards: Array<BingoCard>;  //Cards in room
  public numbers: Array<BingoCardsNumbers>;  // numbers for each cards
  public card: BingoCard; //card bingo 
  public numberChooseTrue: number[];


<<<<<<< HEAD
  public nReceive : number = 0; 
  public cantiCards : number = 0; 
  public IsWinner : boolean =  false; 
=======
  public nReceive: number = 0;
  public cantiCards: number = 0;
  public listIdCards: number[];
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad

  private roomId: number;


  constructor(private service: SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute) {
    //this.getCards(); 
<<<<<<< HEAD
    this.cards = []; 
=======
    this.cards = [];
    this.listIdCards = [];
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad
    this.newCardNumber();
    this.numberChooseTrue = [];
    this.paintNumbers();
    this.getNumbersTrue();
    this.getCantCards();
<<<<<<< HEAD
  
   }

  getCantCards(){
    let ids= JSON.parse(sessionStorage.getItem("listCards")); 
    let list = ids.values as number[]; 
     for (let i = 0; i <list.length; i++) {
         this.getCard(list[i]); 
     }
  }

   ngOnInit(): void {
    this.service.eNotificarNumber.subscribe((numberReceive) =>{
      var r  = numberReceive as BingoNumber; 
        this.numberChooseTrue.push(r.number); 
        this.nReceive = r.number; 
       this.updateNumberIsSelected(r.number); 
       
     });
=======
  }

  getCantCards() {
    this.cantiCards = JSON.parse(sessionStorage.getItem("cantidad"));
    for (let i = 0; i < this.cantiCards; i++) {
      this.getCard();
    }
    console.log("IDs en lista: " + this.listIdCards);
    this.saveIdCardInSessionStorage();
  }

  ngOnInit(): void {
    this.service.eNotificarNumber.subscribe((numberReceive) => {
      var r = numberReceive as BingoNumber;
      this.numberChooseTrue.push(r.number);
      this.nReceive = r.number;
      this.updateNumberIsSelected(r.number);
      console.log(this.cards);
    });
  }
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad


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
    })
  }


  updateNumberIsSelected(number: Number) {
    this.cards.forEach(card => {
      card.bingoCardNumbers.forEach(numberCard => {

<<<<<<< HEAD
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
=======
        if (number == numberCard.number) {
          console.log("Number before update: " + numberCard);
          numberCard.isSelected = true;
          var r = new BingoCardsNumbers().convertToBingoCardsNumbers(numberCard);
          console.log("Number after update: " + numberCard);
          r.isSelected = true;
          this.updateCardNumber(r);
        }
      });
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad
    });

  }

<<<<<<< HEAD
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
=======
  updateCardNumber(number: BingoCardsNumbers) {
    let BingN: BingoCardsNumbers = number;
    if (number.id > 0) {
      //update
      this.http.put<BingoCardsNumbers>(this.baseUrl + 'api/Bingocardnumbers/' + number.id, number).subscribe(result => {
        result = result as BingoCardsNumbers;
        console.log("Result numero: " + result);
        BingN = result;
      }, error => console.error(error));
    }
    return BingN;
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad
  }
  newCardNumber() {
    this.bingoNumber = {
      id: -1,
      number: 0,
      isChosen: false,
      roomsId: -1

    }
  }


  //This method is only test, for to see numbers and cards
  paintNumbers() {
    if (this.cards) {
      this.numbers = [];
      this.cards.forEach(card => {
        card.bingoCardNumbers.forEach(e => {
          let num = new BingoCardsNumbers().convertToBingoCardsNumbers(e);
          console.log(num);
          this.numbers.push(num);
        });
      });
<<<<<<< HEAD
   }
 }  

 getCard(id_card : number){
   console.log("Mi id card: " + id_card ); 
  this.http.get<BingoCard>(this.baseUrl + 'api/Bingocards/'+id_card).subscribe(result => {
    this.cards.push(result); 
  }, error => console.error(error));
 }

updateCardPlaying(id: number, card: BingoCard){
  this.http.put<BingoCard>(this.baseUrl + 'api/Bingocards/playing'+id, card).subscribe(result => {
   
  }, error => console.error(error));
 }



// getCards(){
//   console.log(this.baseUrl + 'api/Bingocards/'+this.roomsId);
//     this.http.get<BingoCard[]>(this.baseUrl + 'api/Bingocards/'+this.roomsId).subscribe(result => {
//      // this.cards = result; 
//     }, error => console.error(error));
// }

newBingoNumber(){
  this.bingoNumber = {
  id:0,
  number: 0,
  isChosen:false,
  roomsId:9 //Este id es default, debe cambiarse
=======
    }
>>>>>>> edc8e8cee942c22e9dceb9acf04586346bac84ad
  }

  getCard() {
    this.http.get<BingoCard>(this.baseUrl + 'api/Bingocards/' + this.roomsId).subscribe(result => {
      this.cards.push(result);
      this.listIdCards.push(result.id);
    }, error => console.error(error));
    console.log("Resultado: " + this.listIdCards);

  }

  saveIdCardInSessionStorage() {
    sessionStorage.setItem("listCards", JSON.stringify(this.listIdCards));
  }

  // getCards(){
  //   console.log(this.baseUrl + 'api/Bingocards/'+this.roomsId);
  //     this.http.get<BingoCard[]>(this.baseUrl + 'api/Bingocards/'+this.roomsId).subscribe(result => {
  //      // this.cards = result; 
  //     }, error => console.error(error));
  // }

  newBingoNumber() {
    this.bingoNumber = {
      id: 0,
      number: 0,
      isChosen: false,
      roomsId: 1 //Este id es default, debe cambiarse
    }
  }


  getNumbersTrue() {
    this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
      result.forEach(element => {
        this.numberChooseTrue.push(element.number);
      });
    }, error => console.error(error));

  }

  idRoom() {
    this.http.get<Room>(this.baseUrl + 'api/Bingonumber/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
      this.roomId = Number(result);
    })
  }

}
