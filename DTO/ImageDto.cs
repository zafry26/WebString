using Microsoft.AspNetCore.Http;

namespace RCB.JavaScript.DTO
{
    public class ImageDto
    {
        public string FileName { get; set; }

        public IFormFile FormFile { get; set; }

        public string Module { get; set; }

        public string Section { get; set; }
    }
}
