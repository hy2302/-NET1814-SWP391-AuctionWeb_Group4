using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Models.Jewelry
{
    public class JewelryType
    {
        [Key]
        public int? JewelryTypeId { get; set; }
        public string? JewelryTypeName { get; set; }

        // Navigation property
        public ICollection<Jewel> Jewelries { get; set; }
    }
}
