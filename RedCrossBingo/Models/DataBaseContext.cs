using Microsoft.EntityFrameworkCore;

namespace RedCrossBingo.Models 
{
     public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<BingoCards> BingoCards { get; set; }
        public DbSet<BingoNumbers> BingoNumbers { get; set; }
        public DbSet<BingoCardNumbers> BingoCardNumbers { get; set; }
        
    }
}