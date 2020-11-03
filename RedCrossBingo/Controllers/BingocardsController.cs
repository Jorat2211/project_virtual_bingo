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

        [HttpGet("allcards/{roomsId}")]
        public async Task<ActionResult<IEnumerable<BingoCards>>> GetCards(long roomsId)
        {
            var cards = await _context.BingoCards.Where(c=> c.RoomsId == roomsId && c.IsPlaying == false).Include(c=> c.BingoCardNumbers).ToListAsync(); 
            if (cards == null)
            {
                return NotFound();
            }
            return cards;
        }

          [HttpGet("{id}")]
        public async Task<ActionResult<BingoCards>> GetCard(long id)
        {
            System.Console.WriteLine("ID card: " +id);
            var card = await _context.BingoCards.Where(c=> c.Id == id).Include(c=> c.BingoCardNumbers).FirstAsync(); 
            if (card == null)
            {
                return NotFound();
            }
            return card;
        }

        [HttpGet("max/{roomsId}")]
        public async Task<int> GetNumberCardMax(long roomsId)
        {
             var cards = await _context.BingoCards.Where(c=> c.RoomsId == roomsId).ToListAsync(); 
            if(cards.Count > 0){
                int numberCardMax = cards.Max(c => c.NumberCard); 
                return numberCardMax;
            }
            return 0; 
        }

        [HttpPut("playing/{id}")]
        public async Task<IActionResult> PutBingo(long id, BingoCards card)
        {
            System.Console.WriteLine("ID carton " +id); 
            System.Console.WriteLine("ID sala: " +card.RoomsId);   

            if (id != card.Id)
            {
                return BadRequest();
            }

            _context.Entry(card).State = EntityState.Modified;

            try
            {
                
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
               if (!cardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // http get
        [HttpGet("roomname/{nameRoom}")]
        public async Task<ActionResult<Rooms>> GetRooms(string nameRoom)
        {
            var roomName = new Rooms();
            var idRoom = await _context.Rooms.Where(x => x.Name == nameRoom).FirstAsync();

            if (idRoom != null)
            {
                roomName = idRoom;
                return Ok(roomName.Id);
            }
            return null;
        }

        private bool cardExists(long id)
        {
            return _context.BingoCards.Any(e => e.Id == id);
        }


    }
}