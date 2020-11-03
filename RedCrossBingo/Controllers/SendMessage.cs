using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR; 
using RedCrossBingo.Models;
using RedCrossBingo.Hubs; 

namespace  RedCrossBingo.Controller
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class SendMessageController : ControllerBase
    {
        public readonly IHubContext<BingoHub> _hubContext; 

        public SendMessageController( IHubContext<BingoHub> hubContext)
        {
            _hubContext = hubContext; 
        }


        [HttpPost]
        public IActionResult SendMensage(bool isWinner){
            string msj = Newtonsoft.Json.JsonConvert.SerializeObject(isWinner);
            _hubContext.Clients.All.SendAsync("SendMensageWinner", msj); 
        
            return Ok(new {resp = "Send Winner "}); 
        }

}
}
