namespace AuctionWebAPI.Models
{
    public class Jewelry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal StartingPrice { get; set; }
        public DateTime AuctionEndDate { get; set; }
    }
}
