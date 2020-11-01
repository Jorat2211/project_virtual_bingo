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
            System.Console.WriteLine("Contador: " + contador);
            SendNumbersPlayers(); 
            return base.OnConnectedAsync();      
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            contador--; 
            System.Console.WriteLine("Contador: " + contador);
            SendNumbersPlayers(); 
            return base.OnDisconnectedAsync(exception);
        }


        public Task SendBingoNumber (string bNumber){
            return Clients.All.SendAsync("bingoNumber", bNumber); 
        }

        public Task SendNumbersPlayers (){
            System.Console.WriteLine("Contador enviado del comtroller: " + contador);
            return Clients.All.SendAsync("SendNumbersPlayers", contador); 
        }

    }
}