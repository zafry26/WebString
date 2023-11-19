using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RCB.JavaScript.Models
{
    public class HeroService
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        //[Required(ErrorMessage = "Image should be specified")]
        [StringLength(200)]
        public string Image { get; set; }

        //[Required(ErrorMessage = "Title should be specified")]
        [StringLength(100)]
        public string Title { get; set; }

        //[Required(ErrorMessage = "Detail should be specified")]
        [StringLength(500)]
        public string Detail { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("HeroForeignKey")]
        public virtual Hero Hero { get; set; }
    }
}