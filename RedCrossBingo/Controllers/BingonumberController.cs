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

        
        [HttpGet("{number}")]
        public async Task<ActionResult<BingoNumbers>> GetNumber([FromQuery] long roomsId, long number)
        {    
            Console.WriteLine(roomsId+number);      
            var cards = await _context.BingoNumbers.ToListAsync(); 
            var cardList= cards.Where(r=> r.RoomsId== roomsId);
            var cardNum= cardList.Where(r=>r.number==number);
            var result=new BingoNumbers();
            result=(BingoNumbers)cardNum;
    
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

    }
}