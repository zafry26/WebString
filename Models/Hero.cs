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
    public class Hero
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        //[Required(ErrorMessage = "Full Name should be specified")]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Display Name should be specified")]
        [StringLength(50)]
        public string DisplayName { get; set; }

        //[Required(ErrorMessage = "Standout message should be specified")]
        [StringLength(50)]
        public string Standout { get; set; }

        //[Required(ErrorMessage = "Facebook Link should be specified")]
        [StringLength(500)]
        public string FbUrl { get; set; }

        //[Required(ErrorMessage = "LinkedIn Link should be specified")]
        [StringLength(500)]
        public string LinkedInUrl { get; set; }

        //[Required(ErrorMessage = "Instagram Link should be specified")]
        [StringLength(500)]
        public string InstagramUrl { get; set; }

        //[Required(ErrorMessage = "Background Image must be specified")]
        [StringLength(500)]
        public string BackgroundImage { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("UserForeignKey")]
        public User User { get; set; }

        public virtual HeroSummary HeroSummary { get; set; }

        public virtual ICollection<HeroEducation> HeroEducations { get; set; }

        public virtual ICollection<HeroExperience> HeroExperiences { get; set; }

        public virtual ICollection<HeroService> HeroServices { get; set; }

        public virtual ICollection<HeroPortfolio> HeroPortfolios { get; set; }

        public virtual ICollection<HeroTechnical> HeroTechnicals { get; set; }
    }
}