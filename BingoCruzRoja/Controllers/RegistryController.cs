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

    [HttpPost("login")]
    public IActionResult login(Registry credentials)
    {        
       var user = _context.reg.Where(x => x.Email == credentials.Email && x.Password == credentials.Password).FirstOrDefault();      
       if (user != null)
       {
         var loginStatus=true;
         return Ok(loginStatus);               
       }
         var loginStatus=false;
         return Ok(loginStatus);   
    }
  }
}




    
