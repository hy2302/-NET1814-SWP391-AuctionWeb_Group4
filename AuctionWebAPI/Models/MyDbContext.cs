using AuctionWebAPI.Models.Admin;
using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Bid;
using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Transaction;
using AuctionWebAPI.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<JewelryType> JewelryTypes { get; set; }
        public DbSet<Jewel> Jewelries { get; set; }
        public DbSet<Auction_Model> Auctions { get; set; }
        public DbSet<Bids> Bids { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<AuctionRequest> AuctionRequests { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            

            // Configure primary keys
            modelBuilder.Entity<Role>()
               .HasMany(r => r.Users)
               .WithOne(u => u.Role)
               .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Jewelries)
                .WithOne(j => j.Owner)
                .HasForeignKey(j => j.OwnerId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Auctions)
                .WithOne(a => a.Staff)
                .HasForeignKey(a => a.StaffId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Bids)
                .WithOne(b => b.Customer)
                .HasForeignKey(b => b.CustomerId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Transactions)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.AuctionRequests)
                .WithOne(ar => ar.Seller)
                .HasForeignKey(ar => ar.SellerId);

            modelBuilder.Entity<JewelryType>()
                .HasMany(jt => jt.Jewelries)
                .WithOne(j => j.JewelryType)
                .HasForeignKey(j => j.JewelryTypeId);

            modelBuilder.Entity<Jewel>()
                .HasMany(j => j.Auctions)
                .WithOne(a => a.Jewelry)
                .HasForeignKey(a => a.JewelryId);

            modelBuilder.Entity<Jewel>()
                .HasMany(j => j.AuctionRequests)
                .WithOne(ar => ar.Jewelry)
                .HasForeignKey(ar => ar.JewelryId);

            modelBuilder.Entity<Auction_Model>()
                .HasMany(a => a.Bids)
                .WithOne(b => b.Auction)
                .HasForeignKey(b => b.AuctionId);

            modelBuilder.Entity<Auction_Model>()
                .HasMany(a => a.Transactions)
                .WithOne(t => t.Auction)
                .HasForeignKey(t => t.AuctionId);
            modelBuilder.Entity<AuctionRequest>()
            .HasKey(ar => ar.RequestId);
           //
           // .HasColumnType("decimal(18, 2)");


            base.OnModelCreating(modelBuilder);
        }

        public DbSet<UserA_A> UserAs { get; set; }
       
        


    }
}
