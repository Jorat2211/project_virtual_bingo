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


        [HttpPost]
        public async Task<ActionResult<BingoNumbers>> PostBingoNumbers(BingoNumbers b)
        {
            _context.BingoNumbers.Add(b);
             await _context.SaveChangesAsync();
            return CreatedAtAction("GetBingoNumbers", new { id = b.Id }, b);
        }

        [HttpGet("{roomsId}")]
        public async Task<ActionResult<IEnumerable<BingoNumbers>>> GetNumber(long roomsId)
        {
            var cards = await _context.BingoNumbers.Where(c=> c.RoomsId == roomsId).ToListAsync(); 
            if (cards == null)
            {
                return NotFound();
            }
            return cards;
        }

    }
}