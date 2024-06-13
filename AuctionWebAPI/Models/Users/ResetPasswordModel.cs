using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Models.Users
{
    public class ResetPasswordModel
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
