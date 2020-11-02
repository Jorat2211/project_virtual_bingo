import { Injectable, EventEmitter } from '@angular/core';
import { HubConnectionBuilder, HubConnection} from '@aspnet/signalr'; 
import { BingoNumber} from './../game/bingonumbers.interface'; 
import {BingoCardsNumbers} from './../game/bingocardnumbers.interface'; 


@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {
  //npm install @aspnet/signalr -->Install this package
  public hubConnection : HubConnection; 

  eNotificarNumber : EventEmitter<BingoNumber> = new EventEmitter(); 
  eNoficUsers : EventEmitter<Number> = new EventEmitter(); 

  
  constructor()  { 
    let builder = new HubConnectionBuilder(); 
    this.hubConnection = builder.withUrl("https://localhost:5001/api/Bingonumber/-1").build(); 
    this.hubConnection.on("SendBingoNumber", (msj) => {
       let bingo : BingoNumber = JSON.parse(msj); 
      this.eNotificarNumber.emit(bingo); 
    });
   
     this.hubConnection.on("SendNumbersPlayers",(msj)=>{
      this.eNoficUsers.emit(msj); 
     });
    this.hubConnection.start().catch(err=>{
      console.log("Error connect " +err); 
    });

  }
 

}
