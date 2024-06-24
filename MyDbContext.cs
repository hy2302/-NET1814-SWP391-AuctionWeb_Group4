using AuctionWebAPI.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserA> UserAs { get; set; }
        public DbSet<Jewelry> Jewelries { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Auction> Auctions { get; set; }
    }
}
