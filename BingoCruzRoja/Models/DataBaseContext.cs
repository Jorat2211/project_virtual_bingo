using Microsoft.EntityFrameworkCore;

namespace BingoCruzRoja.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {           
        }
         public DbSet<Registry> reg { get; set; }      
    }
}