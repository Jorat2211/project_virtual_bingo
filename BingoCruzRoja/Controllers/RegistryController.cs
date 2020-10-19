using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BingoCruzRoja.Models;

namespace BingoCruzRoja.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class RegistryController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public RegistryController(DataBaseContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Registry>>> GetReg()
        // {
        //     return await _context.Registry.ToListAsync();
        // }

    [HttpPost("login")]
    public IActionResult login(Credentials credentials)
    {
        
       var user = _context.Registry.Where(x => x.Email == credentials.Email && x.Password == credentials.Password);
       Console.WriteLine(user);
       if (user != null)
       {
         return Ok(true);       
       }
       return Ok(false);
    }
  }
}




    
