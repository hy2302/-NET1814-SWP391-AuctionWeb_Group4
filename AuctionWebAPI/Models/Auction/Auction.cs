using AuctionWebAPI.Models.Bid;
using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Transaction;
using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace AuctionWebAPI.Models.Auction
{
    public class Auction_Model
    {
        [Key]
        public int? AuctionId { get; set; }
        public int? JewelryId { get; set; }
        public int? StaffId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? AuctionStatus { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? StartingPrice { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? FinalPrice { get; set; }

        public Jewel Jewelry { get; set; }
        public User Staff { get; set; }

        public ICollection<Bids> Bids { get; set; }
        public ICollection<Transactions> Transactions { get; set; }

        // Add AuctionHistories navigation property
        public ICollection<AuctionHistory> AuctionHistories { get; set; }
    }


}
