import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BingoCardsNumbers} from './bingocardnumbers.interface';
import {BingoCard} from './bingocards.interface';
import { BingoNumber } from './bingonumbers.interface';
import {SignalServiceService} from './../services/signal-service.service'; 
import { send } from 'process';

@Component({
  selector: 'app-maintombola',
  templateUrl: './maintombola.component.html',
  styleUrls: ['./maintombola.component.css']
})
export class MaintombolaComponent {

  public bingoNumber : BingoNumber; //Number bingo
  public cards : Array<BingoCard>;  //Cards in room
  public numbers : Array<BingoCardsNumbers>;  // numbers for each cards
  public card : BingoCard; //card bingo 
 // public number : BingoCardsNumbers; 
  private numberChooseTrue: number[];

  private numberReceives : BingoNumber[] = []; 

  constructor(private service : SignalServiceService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.numberChooseTrue = [];
    this.getNumbersTrue();
   }


  newBingoNumber(){
    this.bingoNumber = {
    id:0,
    number: 0,
    isChosen:false,
    roomsId:1 //Este id es default, debe cambiarse
    }
  }

  generateNumberTombola(){  
    this.newBingoNumber();
    for (var i = 1; i < 76; i++)
    {  
      this.bingoNumber.number=i; 
      this.save();   
    }
  }
  
  save(){
    //Insert
       this.http.post<BingoNumber> (this.baseUrl + 'api/Bingonumber', {
        number : this.bingoNumber.number,
        IsChosen : this.bingoNumber.isChosen,
        RoomsId : this.bingoNumber.roomsId
      }).subscribe(result => { 
        console.log(result); 
    }, error => console.error(error));
  }

  verLista(){
    this.numberChooseTrue = []; 
    this.getNumbersTrue();
   // console.log(this.numberChooseTrue);
  }
  
  
  getNumber(){
    var numberRandom = this.newRandom();
    while(this.numberChooseTrue.includes(numberRandom)){
      numberRandom= this.newRandom();
    }
    if(!this.numberChooseTrue.includes(numberRandom)){
       //this.numberChooseTrue.push(numberRandom);
       this.http.get<BingoNumber>(this.baseUrl + 'api/Bingonumber/' + '1/' + numberRandom).subscribe(result => {
         var bingoNumberResult = result as BingoNumber;
         bingoNumberResult.isChosen=true;
         this.updateNumber(bingoNumberResult);
         this.bingoNumber.number = bingoNumberResult.number;
       }, error => console.error(error));
    }
  }
  
  getNumbersTrue(){
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
   
  updateNumber(bingoNumber:BingoNumber){
    if(bingoNumber.id > 0){
      //update
      this.http.put<BingoNumber>(this.baseUrl +'api/Bingonumber/'+bingoNumber.id, bingoNumber).subscribe(result=>{
      }, error=>console.error(error));
      return;
    }
  }
 
}
