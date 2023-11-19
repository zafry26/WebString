using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RCB.JavaScript.Models
{
    public class Developer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

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

        //[Required(ErrorMessage = "LinkedIn Link should be specified")]
        [StringLength(500)]
        public string Hobby { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        // [ForeignKey("UserForeignKey")]
        // public User User { get; set; }
    }
}