using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace RCB.JavaScript.DTO
{
    public class HeroDto
    {
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
    }
    public class HeroSummaryDto
    {
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
    }

    public class HeroEducationDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "Qualification should be specified")]
        [StringLength(100)]
        public string Qualification { get; set; }

        //[Required(ErrorMessage = "FromYear should be specified")]
        public string FromYear { get; set; }

        //[Required(ErrorMessage = "ToYear should be specified")]
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
    }

    public class HeroExperienceDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "PositionTitle should be specified")]
        [StringLength(100)]
        public string PositionTitle { get; set; }

        //[Required(ErrorMessage = "FromYear should be specified")]
        public string FromYear { get; set; }

        //[Required(ErrorMessage = "ToYear should be specified")]
        public string ToYear { get; set; }

        //[Required(ErrorMessage = "Company should be specified")]
        [StringLength(100)]
        public string Company { get; set; }

        //[Required(ErrorMessage = "State should be specified")]
        [StringLength(20)]
        public string State { get; set; }

        //[Required(ErrorMessage = "City should be specified")]
        [StringLength(20)]
        public string City { get; set; }

        //[Required(ErrorMessage = "Country should be specified")]
        [StringLength(20)]
        public string Country { get; set; }

        //[Required(ErrorMessage = "WorkScope should be specified")]
        public ICollection<HeroExperienceDetailsDto> HeroExperienceDetails { get; set; }
    }

    public class HeroExperienceDetailsDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "PositionTitle should be specified")]
        [StringLength(500)]
        public string WorkScope { get; set; }
    }

    public class HeroPortfolioDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "Image should be specified")]
        [StringLength(500)]
        public string Image { get; set; }

        [StringLength(100)]
        public string Category { get; set; }

        //[Required(ErrorMessage = "Title should be specified")]
        [StringLength(100)]
        public string Title { get; set; }

        public HeroPortfolioDetailsDto HeroPortfolioDetails { get; set; }
    }

    public class HeroPortfolioDetailsDto
    {
        public long? Id { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Detail { get; set; }

        public ICollection<HeroPortfolioImagesDto> HeroPortfolioImages { get; set; }
    }

    public class HeroPortfolioImagesDto
    {
        public long? Id { get; set; }

        [StringLength(500)]
        public string Image { get; set; }
    }

    public class HeroServiceDto
    {
        public long? Id { get; set; }

        //[Required(ErrorMessage = "Image should be specified")]
        [StringLength(500)]
        public string Image { get; set; }

        //[Required(ErrorMessage = "Title should be specified")]
        [StringLength(100)]
        public string Title { get; set; }

        //[Required(ErrorMessage = "Detail should be specified")]
        [StringLength(500)]
        public string Detail { get; set; }
    }

    public class HeroTechnicalDto
    {
        //[Required(ErrorMessage = "Image should be specified")]
        [StringLength(500)]
        public string Image { get; set; }

        //[Required(ErrorMessage = "Title should be specified")]
        [StringLength(100)]
        public string Title { get; set; }

        //[Required(ErrorMessage = "Detail should be specified")]
        [StringLength(500)]
        public string Detail { get; set; }
    }
}
