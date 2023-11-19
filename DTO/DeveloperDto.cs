using System.ComponentModel.DataAnnotations;
namespace RCB.JavaScript.DTO
{
    public class DeveloperDto
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Username should be specified")]
        [StringLength(50)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email should be specified")]
        [StringLength(50)]
        public string Email { get; set; }

        [Required(ErrorMessage = "PhoneNumber should be specified")]
        [StringLength(50)]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Skillsets should be specified")]
        [StringLength(500)]
        public string Skillsets { get; set; }

        [Required(ErrorMessage = "LinkedIn Link should be specified")]
        [StringLength(500)]
        public string Hobby { get; set; }

    }
}
