namespace AuctionWebAPI.Models.Jewelry
{
    public class JewelryDTO
    {
        public int? JewelryId { get; set; }

        public int? OwnerId { get; set; }

        public int? JewelryTypeId { get; set; }

        public string? JewelryName { get; set; }

        public string? JewelryDescription { get; set; }

        public IFormFile JewelryImage { get; set; }

        public string? JewelryImageName { get; set; }

        public string? JewelryStatus { get; set; }
    }
}
