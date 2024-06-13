using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AuctionWebAPI.Models.Users
{
    public class RegistrationModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Number { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }
    }
}
