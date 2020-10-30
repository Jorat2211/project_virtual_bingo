using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RedCrossBingo.Models
{
    public class BingoCards
    {
        [Key]
        public long Id { get; set; }
        public long RoomsId { get; set; }
        public virtual Rooms Rooms { get; set; }
        public List<BingoCardNumbers> BingoCardNumbers { get; set; } = new List<BingoCardNumbers>();
    }
}