using AuctionWebAPI.Validations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Auction
{
    public class AuctionHistoryDTO
    {
        public int? AuctionId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? BidAmount { get; set; }
        public string? ChangeDescription { get; set; }
        public string? ChangedBy { get; set; }
    }
}
