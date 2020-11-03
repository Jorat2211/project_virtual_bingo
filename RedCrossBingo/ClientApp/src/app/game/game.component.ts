
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BingoCardsNumbers } from './bingocardnumbers.interface';
import { BingoCard } from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import { SignalServiceService } from './../services/signal-service.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../mainadmin/mainadmin.interface';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  public roomsId = 6;

  public bingoNumber: BingoNumber; //Number bingo
  public cards: Array<BingoCard>;  //Cards in room
  public numbers: Array<BingoCardsNumbers>;  // numbers for each cards
  public card: BingoCard; //card bingo 
  public numberChooseTrue: number[];


  public nReceive: number = 0;
  public cantiCards: number = 0;
  public listIdCards: number[];

  private roomId: number;


  constructor(private service: SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute) {
    //this.getCards(); 
    this.cards = [];
    this.listIdCards = [];
    this.newCardNumber();
    this.numberChooseTrue = [];
    this.paintNumbers();
    this.getNumbersTrue();
    this.getCantCards();
    this.idRoom();
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




  updateNumberIsSelected(number: Number) {
    this.cards.forEach(card => {
      card.bingoCardNumbers.forEach(numberCard => {

        if (number == numberCard.number) {
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
    }
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
    this.http.get<Room>(this.baseUrl + 'api/Bingocards/roomname/' + this._route.snapshot.paramMap.get('roomname')).subscribe(result => {
      this.roomId = Number(result);
      console.log(this.roomId);
    })
  }

}
