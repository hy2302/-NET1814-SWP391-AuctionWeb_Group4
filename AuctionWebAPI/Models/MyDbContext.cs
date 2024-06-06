﻿using AuctionWebAPI.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
    }
}