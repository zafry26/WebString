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
    public class StoreSummary
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(100)]
        public string StoreName { get; set; }

        [StringLength(50)]
        public string Standout { get; set; }

        [StringLength(500)]
        public string FbUrl { get; set; }

        [StringLength(500)]
        public string LinkedInUrl { get; set; }

        [StringLength(500)]
        public string InstagramUrl { get; set; }

        [StringLength(500)]
        public string Logo { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("UserForeignKey")]
        public User User { get; set; }

        public virtual ICollection<StoreCategory> StoreCategories { get; set; }

        public virtual ICollection<StorePayment> StorePayments { get; set; }
    }
}