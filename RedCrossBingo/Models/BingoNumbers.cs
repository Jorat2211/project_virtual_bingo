using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RedCrossBingo.Models
{
    public class BingoNumbers
    {
        [Key]
        public long Id { get; set; }
        public long number { get; set; }
        public bool IsChosen { get; set; }
        public long RoomsId { get; set; }
        public virtual Rooms Rooms { get; set; }
    }
}