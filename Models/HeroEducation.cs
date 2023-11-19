using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RCB.JavaScript.Models
{
    public class HeroEducation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        //[Required(ErrorMessage = "Qualification should be specified")]
        [StringLength(100)]
        public string Qualification { get; set; }

        //[Required(ErrorMessage = "From Year should be specified")]
        public string FromYear { get; set; }

        //[Required(ErrorMessage = "To Year should be specified")]x
        public string ToYear { get; set; }

        //[Required(ErrorMessage = "University should be specified")]
        [StringLength(100)]
        public string University { get; set; }

        //[Required(ErrorMessage = "State should be specified")]
        [StringLength(20)]
        public string State { get; set; }

        //[Required(ErrorMessage = "Country should be specified")]
        [StringLength(20)]
        public string Country { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("HeroForeignKey")]
        public virtual Hero Hero { get; set; }
    }
}