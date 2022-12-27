using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }
        public string? Email { get; set; }
        [Required]
        public byte[]? Password { get; set; }

        public byte[]? PasswordKey { get; set; }
        public string MobileNumber { get; set; }
    }
}