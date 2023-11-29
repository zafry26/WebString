using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;

namespace RCB.JavaScript.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Email should be specified")]
        [StringLength(50)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Full Name cannot be empty")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "User Name should be specified")]
        [StringLength(50)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password must be specified")]
        public string Password { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? Created { get; set; }

        [AllowNull]
        public Hero Hero { get; set; }

        [AllowNull]
        public StoreSummary storeSummary { get; set; }
    }
}

