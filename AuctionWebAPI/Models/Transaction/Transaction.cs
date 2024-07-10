using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionWebAPI.Models.Transaction
{
    public class Transactions
    {
        [Key]
        public int? TransactionId { get; set; }
        public int? AuctionId { get; set; }
        
        public int? UserId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? TotalAmount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        [PriceValidation]
        public decimal? TransactionFee { get; set; }
        public DateTime? TransactionDate { get; set; }
        public AuctionRequest AuctionRequest { get; set; }

        public Auction_Model Auction { get; set; }
        public User User { get; set; }
    }
}
