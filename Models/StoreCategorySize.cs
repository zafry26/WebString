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
    public class StoreCategorySize
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(10)]
        public string SizeCode { get; set; }

        [StringLength(50)]
        public string SizeName { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required(ErrorMessage = "Created At must be specified")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Created By must be specified")]
        public long CreatedBy { get; set; }

        [ForeignKey("StoreCategoryForeignKey")]
        public StoreCategory StoreCategory { get; set; }
    }
}