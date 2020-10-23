using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RedCrossBingo.Models
{
    public class BingoCardNumbers
    {
        [Key]
        public long Id { get; set; }
        public long number { get; set; }
        public bool IsSelected { get; set; }
        public long BingoCardsId { get; set; }
        public virtual BingoCards BingoCards { get; set; }
    }
}