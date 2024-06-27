using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Models.Users
{
    public class Role
    {
        [Key]
        public int? RoleId { get; set; }
        public string? RoleName { get; set; }

        // Navigation property
        public ICollection<User> Users { get; set; }
    }
}
