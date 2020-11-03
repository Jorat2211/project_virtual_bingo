using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RedCrossBingo.Models;
using RedCrossBingo.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace RedCrossBingo.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BingonumberController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public readonly IHubContext<BingoHub> _hubContext;

        public BingonumberController(DataBaseContext context, IHubContext<BingoHub> hubContex)
        {
            _context = context;
            _hubContext = hubContex;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> GetNumber()
        {
            return await _context.BingoNumbers.ToListAsync();
        }
        [HttpGet("room/{roomsId}")]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> existRoom(int roomsId)
        {
            var infoTom = await _context.BingoNumbers.Where(r => r.RoomsId == roomsId).ToListAsync();
            System.Console.WriteLine(infoTom);
            return infoTom;
        }

        [HttpGet("numbers/{isChoose}/{roomId}")]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> GetNumberTrue(bool isChoose, long roomId)
        {
            var info = await _context.BingoNumbers.Where(r => r.IsChosen == isChoose && r.RoomsId == roomId).ToListAsync();
            return info;
        }

        [HttpPost]
        public async Task<ActionResult<BingoNumbers>> PostBingoNumbers(BingoNumbers b)
        {
            _context.BingoNumbers.Add(b);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBingoNumbers", new { id = b.Id }, b);
        }


        [HttpGet("{roomsId}/{number}")]
        public async Task<ActionResult<BingoNumbers>> GetNumber(long roomsId, long number)
        {
            var cards = await _context.BingoNumbers.ToListAsync();
            var bingo = new BingoNumbers();

            foreach (var cr in cards.Where(e => e.RoomsId == roomsId && e.number == number))
            {
                bingo.Id = cr.Id;
                bingo.number = cr.number;
                bingo.RoomsId = cr.RoomsId;
            }
            if (bingo == null)
            {
                return NotFound();
            }
            return Ok(bingo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBingo(long id, BingoNumbers bingo)
        {

            if (id != bingo.Id)
            {
                return BadRequest();
            }

            _context.Entry(bingo).State = EntityState.Modified;

            try
            {

                await _context.SaveChangesAsync();
                //Send to hub 
                SendNumberbingo(bingo);

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!numberExists(id))
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

        private bool numberExists(long id)
        {
            return _context.BingoNumbers.Any(e => e.Id == id);
        }

        public IActionResult SendNumberbingo(BingoNumbers bingo)
        {
            string b = Newtonsoft.Json.JsonConvert.SerializeObject(bingo);
            _hubContext.Clients.All.SendAsync("SendBingoNumber", b);
            return Ok(new { resp = "Send number" });
        }

    }


}
