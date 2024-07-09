using AuctionWebAPI.Models.Jewelry;
using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Validations;
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
        [PriceValidation]

        public decimal? InitialValuation { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]

        public decimal? FinalValuation { get; set; }

        [ForeignKey("SellerId")]
        public virtual User Seller { get; set; }

        [ForeignKey("JewelryId")]
        public virtual Jewel Jewelry { get; set; }
    }
}
