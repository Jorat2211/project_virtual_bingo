
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
  public roomsId = 3; 

  public bingoNumber : BingoNumber;
  public cards : Array<BingoCard>; 
<<<<<<< HEAD
  public numbers : Array<BingoCardsNumbers>; 
=======
  public card : BingoCard; 
  public number : BingoCardsNumbers; 
  private numberChooseTrue: number[];

>>>>>>> 3a94585d2058f6b734396eb50a05af59798c1272

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

    this.getCards(); 
    this.newCardNumber();
    this.numberChooseTrue = [];
    this.getNumbersTrue();
    
   }

  newCardNumber(){
    this.bingoNumber={
      id:-1,
      number: 0,
      isChosen:false,
      roomsId:-1
     
    }
  }


   //This method is only test, for to see numbers and cards
 paintNumbers(){
   if(this.cards){
     this.numbers = []; 
      this.cards.forEach(card=> {
        card.bingoCardNumbers.forEach(e => {
        let num = new BingoCardsNumbers().convertToBingoCardsNumbers(e); 
        this.numbers.push(num); 
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
  isChosen:false,
  roomsId:6 //Este id es default, debe cambiarse
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

generateNumberTombola(){  
  this.newBingoNumber();
  for (var i = 1; i < 76; i++)
  {  
    this.bingoNumber.number=i; 
    this.save();   
  }
}

getNumber(){
  var numberRandom = this.newRandom();
  while(this.numberChooseTrue.includes(numberRandom)){
    numberRandom= this.newRandom();
  }
  if(!this.numberChooseTrue.includes(numberRandom)){
     this.numberChooseTrue.push(numberRandom);
     console.log(this.numberChooseTrue);
     this.http.get<BingoNumber>(this.baseUrl + 'api/Bingonumber/' + '6/' + numberRandom).subscribe(result => {
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
