import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BingoCardsNumbers } from './bingocardnumbers.interface';
import { BingoCard } from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import { SignalServiceService } from './../services/signal-service.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../mainadmin/mainadmin.interface';
import { User } from '../login/login.interface';

@Component({
  selector: 'app-maintombola',
  templateUrl: './maintombola.component.html',
  styleUrls: ['./maintombola.component.css']
})
export class MaintombolaComponent implements OnInit {

  public bingoNumber: BingoNumber; //Number bingo
  public cards: Array<BingoCard>;  //Cards in room
  public numbers: Array<BingoCardsNumbers>;  // numbers for each cards
  public card: BingoCard; //card bingo 


  private numberChooseTrue: number[];
  private usersPlaying = 0;
  private logueado: [];
  private user: User;
  private roomId: number = 0;

  //Form 
  private showBingoTom: boolean;
  private showGenerateNumber: boolean;
  constructor(private service: SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private _route: ActivatedRoute) {
    this.idRoom();
    this.numberChooseTrue = [];
    this.getNumbersTrue();
    this.newBingoNumber();
    this.existRoom();
    this.userLogueado();
  }


  ngOnInit(): void {
    this.service.eNotificarNumber.subscribe((numberReceive) => {
      var r = numberReceive as BingoNumber;
      this.numberChooseTrue.push(r.number);

    });

    this.service.eNoficUsers.subscribe((result) => {
      this.usersPlaying = result;
    });
  }

  userLogueado() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    this.user = {
      id: this.logueado['user']['id'],
      email: this.logueado['user']['email'],
      password: this.logueado['user']['password'],
    }
  }

  newBingoNumber() {
    this.bingoNumber = {
      id: 0,
      number: 0,
      isChosen: false,
      roomsId: this.roomId
    }
  }

  generateNumberTombola() {
    this.newBingoNumber();
    for (var i = 1; i < 76; i++) {
      this.bingoNumber.number = i;
      this.save();
    }
    this.existRoom();
    this.bingoNumber.number = 0;
  }

  save() {
    //Insert
    this.http.post<BingoNumber>(this.baseUrl + 'api/Bingonumber', {
      number: this.bingoNumber.number,
      IsChosen: this.bingoNumber.isChosen,
      RoomsId: this.bingoNumber.roomsId
    }).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }

  getNumber() {
    var numberRandom = this.newRandom();
    while (this.numberChooseTrue.includes(numberRandom)) {
      numberRandom = this.newRandom();
    }
    if(!this.numberChooseTrue.includes(numberRandom)){
       this.http.get<BingoNumber>(this.baseUrl + 'api/Bingonumber/' +this.roomId+'/' + numberRandom).subscribe(result => {
         var bingoNumberResult = result as BingoNumber;
         bingoNumberResult.isChosen=true;
         this.updateNumber(bingoNumberResult);
         this.bingoNumber.number = bingoNumberResult.number;
       }, error => console.error(error));
    }
  }

  getNumbersTrue() {
    this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/' + 'true/').subscribe(result => {
      result.forEach(element => {
        this.numberChooseTrue.push(element.number);
      });
    }, error => console.error(error));

  }

  newRandom() {
    const min = 1;
    const max = 75;
    return Math.floor(Math.random() * (max - min + 1) + min);

  }

  updateNumber(bingoNumber: BingoNumber) {
    if (bingoNumber.id > 0) {
      this.http.put<BingoNumber>(this.baseUrl + 'api/Bingonumber/' + bingoNumber.id, bingoNumber).subscribe(result => {
      }, error => console.error(error));
      return;
    }
  }

 
  existRoom() {
    this.http.get<BingoNumber[]>(this.baseUrl + 'api/Bingonumber/room/' + this.roomId).subscribe(result => {
      if (result.length >= 1) {
        this.showBingoTom = false;
        this.showGenerateNumber = true;
      } else {
        this.showBingoTom = true;
        this.showGenerateNumber = false;
      }
    }, error => console.error(error));
  }

  idRoom() {
    this.http.get<Room>(this.baseUrl + 'api/Bingonumber/roomname/' + this._route.snapshot.paramMap.get('roomname'), this.headers()).subscribe(result => {
      this.roomId = Number(result);
    })
  }

  private headers() {
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    return {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${this.logueado['token']}` }
    };
  }


}
