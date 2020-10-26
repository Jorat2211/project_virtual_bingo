using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RedCrossBingo.Models;

namespace RedCrossBingo.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BingonumberController : ControllerBase
    {
        private readonly DataBaseContext _context;
       
        public BingonumberController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> GetNumber()
        {
            return await _context.BingoNumbers.ToListAsync();
        }


        [HttpGet("{isChoose}")]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> GetNumberTrue(bool isChoose)
        {
            var info = await _context.BingoNumbers.Where(r=> r.IsChosen == isChoose).ToListAsync();
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
            var bingo= new BingoNumbers();
           
            foreach (var cr in cards.Where(e => e.RoomsId == roomsId && e.number==number))
            {
                bingo.Id = cr.Id;
                bingo.number= cr.number;
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

        private bool numberExists(long id)
        {
            return _context.BingoNumbers.Any(e => e.Id == id);
        }

    }


}
