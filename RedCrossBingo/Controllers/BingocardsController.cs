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
    public class BingocardsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public BingocardsController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BingoCards>>> GetCards()
        {
            return await _context.BingoCards.Include(c=> c.BingoCardNumbers ).ToListAsync();
        }


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