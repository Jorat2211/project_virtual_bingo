using System.Collections.Generic;

namespace RedCrossBingo.Models
{
    public class Users
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Rooms> Rooms { get; set; } = new List<Rooms>();

    }
}