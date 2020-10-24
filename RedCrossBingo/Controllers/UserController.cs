using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RedCrossBingo.Models;

namespace RedCrossBingo.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public UserController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult login(Users credentials)
        {
            var user = _context.Users.Where(x => x.Email == credentials.Email && x.Password == credentials.Password).FirstOrDefault();
          
            if (user != null)
            {
                return Ok(user);
            }
            return null;
        }
    }
}