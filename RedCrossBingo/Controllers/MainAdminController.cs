using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RedCrossBingo.Models;

namespace RedCrossBingo.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MainAdminController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public MainAdminController(DataBaseContext context)
        {
            _context = context;
        }

        // http post

        [HttpPost]
        public async Task<ActionResult<Rooms>> PostRoom (Rooms rooms)
        {
            _context.Rooms.Add(rooms);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRooms", new { id = rooms.Id }, rooms);
        }

        // http get
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetRooms(long id)
        {
            var rooms = await _context.Rooms.Where(x => x.UsersId == id).ToListAsync();
            if (rooms != null)
            {
                return Ok(rooms);
            }
            return null;
        }

        // http delete

    }
}