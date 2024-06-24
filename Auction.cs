namespace AuctionWebAPI.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public decimal FinalPrice { get; set; }
        public DateTime AuctionEndDate { get; set; }
    }
}
