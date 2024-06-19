using AuctionWebAPI.Validations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Transaction
{
    public class TransactionDTO
    {
        public int? TransactionId { get; set; }
        public int? AuctionId { get; set; }
        public int? UserId { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? TotalAmount { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? TransactionFee { get; set; }
    }
}
