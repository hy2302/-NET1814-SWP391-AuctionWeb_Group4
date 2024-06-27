using System.Data;

namespace AuctionWebAPI.Models.Users
{
    public class User
    {
        public int UserId { get; set; } = 0;
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Number { get; set; }
        public string Address { get; set; }
        public int IsActive { get; set; } = 1;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
