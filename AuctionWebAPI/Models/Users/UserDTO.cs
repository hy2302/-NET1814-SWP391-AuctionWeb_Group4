using System.Data;

namespace AuctionWebAPI.Models.Users
{
    public class UserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Number { get; set; }
        public string Address { get; set; }
    }
}
