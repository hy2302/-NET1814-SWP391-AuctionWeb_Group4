namespace AuctionWebAPI.Models
{
    public class Transaction_A
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TransactionFee { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
