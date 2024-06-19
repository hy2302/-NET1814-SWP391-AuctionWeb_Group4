using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Models.Jewelry
{
    public class Jewel
    {
        [Key]
        public int? JewelryId { get; set; }
        public int? OwnerId { get; set; }
        public int? JewelryTypeId { get; set; }
        public string? JewelryName { get; set; }
        public string? JewelryDescription { get; set; }
        public string? JewelryImage { get; set; }
        public string? JewelryStatus { get; set; }

        // Navigation properties
        public User Owner { get; set; }
        public JewelryType JewelryType { get; set; }
        public ICollection<Auction_Model> Auctions { get; set; }
        public ICollection<AuctionRequest> AuctionRequests { get; set; }

    }

}