using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Auction
{
    public class AuctionRequest
    {
        [Key]
        public int? RequestId { get; set; }
        public int? SellerId { get; set; }
        public int? JewelryId { get; set; }
        public DateTime? RequestDate { get; set; }
        public string? RequestStatus { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? InitialValuation { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? FinalValuation { get; set; }

        public User Seller { get; set; }
        public Jewel Jewelry { get; set; }
    }
}
