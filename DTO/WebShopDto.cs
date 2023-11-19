using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCB.JavaScript.DTO
{
    public class StoreSummaryDto
    {
        public long? Id { get; set; }

        [Required(ErrorMessage = "StoreName should be specified")]
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
    }

    public class StoreCategoryDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "Summary should be specified")]
        [StringLength(10)]
        public string CategoryId { get; set; }

        //[Required(ErrorMessage = "City should be specified")]
        [StringLength(100)]
        public string CategoryName { get; set; }

        public ICollection<StoreCategorySizesDto> StoreCategorySizes { get; set; }
    }

    public class StoreCategorySizesDto
    {
        public long? Id { get; set; }

        [StringLength(500)]
        public string SizeCode { get; set; }
    }
}
