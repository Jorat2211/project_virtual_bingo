import { Injectable, EventEmitter } from '@angular/core';
import { HubConnectionBuilder, HubConnection} from '@aspnet/signalr'; 
import { BingoNumber} from './../game/bingonumbers.interface'; 


@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {
  //npm install @aspnet/signalr -->Install this package
  public hubConnection : HubConnection; 
  public  url_bingoNumber : "https://localhost:5001/api/Bingonumber";
  public  url_bingocardsnumber : "https://localhost:5001/api/Bingocardsnumber";


  eNotificarNumber : EventEmitter<BingoNumber> = new EventEmitter(); 
  eNoficUsers : EventEmitter<Number> = new EventEmitter(); 

  
  constructor()  { 
    let builder = new HubConnectionBuilder(); 
    //"https://localhost:5001/api/Bingonumber/-1"
    this.hubConnection = builder.withUrl("https://localhost:5001/api/Bingonumber/-1").build(); 
    this.hubConnection.on("SendBingoNumber", (msj) => {
       let bingo : BingoNumber = JSON.parse(msj); 
       console.log("bingo: " +bingo); 
      this.eNotificarNumber.emit(bingo); 
    });
   
     this.hubConnection.on("SendNumbersPlayers",(msj)=>{
       console.log("Conexion conetados"); 
       
       console.log("Mensaje:  " +msj); 
      this.eNoficUsers.emit(msj); 
     });
    this.hubConnection.start().catch(err=>{
      console.log("Error connect " +err); 
    });

  }
 

}
