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
    public class MainAdminController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public MainAdminController(DataBaseContext context)
        {
            _context = context;
        }

        // http post

        // http get

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        // http delete


        // [HttpPost("login")]
        // public IActionResult login(Users credentials)
        // {
        //     bool loginStatus;
        //     var user = _context.users.Where(x => x.Email == credentials.Email && x.Password == credentials.Password).FirstOrDefault();
        //     if (user != null)
        //     {
        //         loginStatus = true;
        //         return Ok(loginStatus);
        //     }
        //     loginStatus = false;
        //     return Ok(loginStatus);
        // }
    }
}