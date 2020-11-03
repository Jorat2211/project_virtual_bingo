using Microsoft.AspNetCore.SignalR; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedCrossBingo.Hubs
{
    public class BingoHub : Hub
    {
       public static int contador = 0; 
        public override Task OnConnectedAsync()
        {
            contador++; 
            SendNumbersPlayers(); 
            return base.OnConnectedAsync();      
        }
       
        public override Task OnDisconnectedAsync(Exception exception)
        {
            contador--; 
            SendNumbersPlayers(); 
            return base.OnDisconnectedAsync(exception);
        }

        ///<sumary>
        ///Send bingo for all clients
        ///<param name= "bNumber"></param> number receive
        ///</sumary>
        public Task SendBingoNumber (string bNumber){
            return Clients.All.SendAsync("bingoNumber", bNumber); 
        }

        ///<sumary>
        ///Send numbers of players to admin
        ///</sumary>
        public Task SendNumbersPlayers (){
            return Clients.All.SendAsync("SendNumbersPlayers", contador); 
        }

        ///<sumary>
        ///Send mesagge is winner or lose
        ///<param name= "isWinner"></param> 
        ///</sumary>
        public Task SendMensageWinner(string isWinner){
            return Clients.All.SendAsync(" SendMensageWinner", isWinner); 
        }
    }
}