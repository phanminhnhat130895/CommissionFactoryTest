using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace Repositories
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public virtual DbSet<Tasks> Tasks { get; set; }

        public virtual DbSet<Users> Users { get; set; }
    }
}