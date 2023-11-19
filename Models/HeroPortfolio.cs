using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RCB.JavaScript.Models
{
    public class HeroPortfolio
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        //[Required(ErrorMessage = "Position Title should be specified")]
        [StringLength(200)]
        public string Image { get; set; }

        //[Required(ErrorMessage = "From Year should be specified")]
        public string Category { get; set; }

        //[Required(ErrorMessage = "To Year should be specified")]
        //[StringLength(50)]
        public string Title { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("HeroForeignKey")]
        public Hero Hero { get; set; }

        public virtual HeroPortfolioDetail HeroPortfolioDetails { get; set; }
    }
}