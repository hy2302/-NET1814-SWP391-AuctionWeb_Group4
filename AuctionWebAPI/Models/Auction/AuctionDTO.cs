using AuctionWebAPI.Validations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Auction
{
    public class AuctionDTO
    {
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
    }
}
