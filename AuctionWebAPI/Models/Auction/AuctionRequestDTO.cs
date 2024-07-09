using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AuctionWebAPI.Validations;

namespace AuctionWebAPI.Models.Auction
{
    public class AuctionRequestDTO
    {
        public int? RequestId { get; set; }
        public int? SellerId { get; set; }
        public int? JewelryId { get; set; }
        public DateTime? RequestDate { get; set; }
        public string? RequestStatus { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? InitialValuation { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? FinalValuation { get; set; }

        public string? JewelryName { get; set; }
        public string? JewelryDescription { get; set; }
        public IFormFile? JewelryImage { get; set; }
        public int? JewelryTypeId { get; set; }
    }
}
