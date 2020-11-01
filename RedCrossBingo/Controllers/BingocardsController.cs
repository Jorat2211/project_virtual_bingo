using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR; 
using RedCrossBingo.Models;
using RedCrossBingo.Hubs; 
namespace RedCrossBingo.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BingocardsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public readonly IHubContext<BingoHub> _hubContext; 

        public BingocardsController(DataBaseContext context, IHubContext<BingoHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BingoCards>>> GetCards()
        {
            return await _context.BingoCards.Include(c=> c.BingoCardNumbers ).ToListAsync();
        }

        //  [HttpPut("{contador}")]
        //  public   IActionResult SendNumbersPlayers(int contador ){
        //      _hubContext.Clients.All.SendAsync("SendNumbersPlayers", contador); 
        //     return Ok(new {resp = "Send number"}); 

        // }

        [HttpPost]
        public async Task<ActionResult<BingoCards>> PostBingoCards(BingoCards b)
        {
            _context.BingoCards.Add(b);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBingoCards", new { id = b.Id }, b);
        }

        [HttpGet("{roomsId}")]
        public async Task<ActionResult<IEnumerable<BingoCards>>> GetCards(long roomsId)
        {
            var cards = await _context.BingoCards.Where(c=> c.RoomsId == roomsId).Include(c=> c.BingoCardNumbers).ToListAsync(); 
            if (cards == null)
            {
                return NotFound();
            }
            return cards;
        }

    }
}