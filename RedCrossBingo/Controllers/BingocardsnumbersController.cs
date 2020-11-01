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
    public class BingocardnumbersController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public BingocardnumbersController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BingoCardNumbers>>> GetCards()
        {
            return await _context.BingoCardNumbers.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<BingoCardNumbers>> PostBingocardnumbers(BingoCardNumbers b)
        {
            _context.BingoCardNumbers.Add(b);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBingoCards", new { id = b.Id }, b);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNumero(long id, BingoCardNumbers number)
        {
            if (id != number.Id)
            {
                return BadRequest();
            }

            _context.Entry(number).State = EntityState.Modified;

            try
            {
                
                await _context.SaveChangesAsync();
                //mandar al hub 
                   return CreatedAtAction("GetBingoCards", new { id = number.Id }, number);
               
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

            //return NoContent();
        }

        private bool numberExists(long id)
        {
            return _context.BingoCardNumbers.Any(e => e.Id == id);
        }

    }
}