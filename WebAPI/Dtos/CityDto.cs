using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class CityDto
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "Name is mandatory field")]
        [StringLength(50, MinimumLength = 3)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Only numerics are not allowed")]
        public string? Name { get; set; }
        [Required]
        public string? Country { get; set; }
    }
}