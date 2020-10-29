using Microsoft.AspNetCore.SignalR; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedCrossBingo.Hubs
{
    public class BingoHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            System.Console.WriteLine("Obteniendo conexión...");
            return base.OnConnectedAsync();      
        }

        public Task SendBingoNumber (string bNumber){
            return Clients.All.SendAsync("bingoNumber", bNumber); 
        }


    }
}