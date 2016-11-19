using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobTest.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace JobTest.Core.Context
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().ToTable("Company");
            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
