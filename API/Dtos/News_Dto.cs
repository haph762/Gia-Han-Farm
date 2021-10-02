using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class News_Dto
    {
        public int? News_ID { get; set; }
        public string Title { get; set; }
        public string Short_Description { get; set; }
        public string Contents { get; set; }
        public string Update_By { get; set; }
        public DateTime? Update_Time { get; set; }
        public string Image { get; set; }
        public List<string> UrlImages { get; set;}
        public List<IFormFile> File { get; set; }
    }
}