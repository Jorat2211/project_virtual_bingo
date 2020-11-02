using System;
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

        // http get name

        [HttpGet("{iduser}/{name}")]
        public async Task<ActionResult<Rooms>> GetRoomName (long iduser, string name)
        {
            var rooms = await _context.Rooms.ToListAsync();
            var roomName = new Rooms();

            foreach (var cr in rooms.Where(e => e.UsersId == iduser && e.Name == name))
            {
                roomName.Name = cr.Name;               
            }
            if (roomName != null)
            {
                return Ok(roomName);
            }
            return null;
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Rooms>> DeleteRoom(long id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return room;
        }

    }
}