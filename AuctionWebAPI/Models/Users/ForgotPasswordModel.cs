using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Models.Users
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
