using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RCB.JavaScript.Models
{
    public class HeroSummary
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        //[Required(ErrorMessage = "Summary should be specified")]
        [StringLength(300)]
        public string Summary { get; set; }

        //[Required(ErrorMessage = "City should be specified")]
        [StringLength(20)]
        public string City { get; set; }

        //[Required(ErrorMessage = "State should be specified")]
        [StringLength(20)]
        public string State { get; set; }

        //[Required(ErrorMessage = "Country should be specified")]
        [StringLength(20)]
        public string Country { get; set; }

        [Required(ErrorMessage = "Email should be specified")]
        [StringLength(50)]
        public string Email { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("HeroForeignKey")]
        public virtual Hero Hero { get; set; }
    }
}