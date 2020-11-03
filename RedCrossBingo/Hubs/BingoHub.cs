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


        public Task SendBingoNumber (string bNumber){
            return Clients.All.SendAsync("bingoNumber", bNumber); 
        }

        public Task SendNumbersPlayers (){
            return Clients.All.SendAsync("SendNumbersPlayers", contador); 
        }

        public Task SendMensageWinner(string isWinner){
            return Clients.All.SendAsync(" SendMensageWinner", isWinner); 
        }
    }
}