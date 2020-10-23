using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RedCrossBingo.Models
{
    public class Rooms
    {
        [Key]
        public long Id { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public List<BingoCards> BingoCards { get; set; } = new List<BingoCards>();
        public List<BingoNumbers> BingoNumbers { get; set; } = new List<BingoNumbers>();
    }
}