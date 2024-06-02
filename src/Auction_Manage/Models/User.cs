using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        public int role_id { get; set; }
        public string? user_name { get; set; }
        public string? password { get; set; }
        public string? user_email { get; set; }
        public string? contact_number { get; set; }
        public string? user_address { get; set; }   
    }
}
