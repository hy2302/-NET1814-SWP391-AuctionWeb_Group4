using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Bid;
using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Transaction;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AuctionWebAPI.Models.Users
{
    public class User
    {
        [Key]
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Number { get; set; }
        public string? Address { get; set; }



        // Navigation property

        public Role Role { get; set; }
        public ICollection<Jewel> Jewelries { get; set; }
        public ICollection<Auction_Model> Auctions { get; set; }
        public ICollection<Bids> Bids { get; set; }
        public ICollection<Transactions> Transactions { get; set; }
        public ICollection<AuctionRequest> AuctionRequests { get; set; }


    }
}
