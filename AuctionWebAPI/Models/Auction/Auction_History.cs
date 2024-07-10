using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Validations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Auction
{
    public class AuctionHistory
    {
        [Key]
        public int? HistoryId { get; set; }

        public int? AuctionId { get; set; }
        public int? JewelryId { get; set; }
        public int? UserId { get; set; }

        public DateTime? HistoryDate { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? FinalPrice { get; set; }

        public string? Username { get; set; }

        // Navigation properties
        public Auction_Model Auction { get; set; }
        public Jewel Jewelry { get; set; }
        public User User { get; set; }


    }
}

