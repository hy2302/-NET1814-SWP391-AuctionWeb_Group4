using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Bid
{
    public class Bids
    {
        [Key]
        public int? BidId { get; set; }
        public int? CustomerId { get; set; }
        public int? AuctionId { get; set; }
        public DateTime? BidTime { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? BidAmount { get; set; }
        public string? BidStatus { get; set; }

        public User Customer { get; set; }
        public Auction_Model Auction { get; set; }
    }
}
