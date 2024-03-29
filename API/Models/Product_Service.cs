// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace API.Models
{
    public partial class Product_Service
    {
        [Key]
        public int Product_Service_ID { get; set; }
        [Required]
        [StringLength(20)]
        public string Product_Service_Cate_ID { get; set; }
        [Required]
        [StringLength(254)]
        public string Product_Service_Name { get; set; }
        public int? Time_Sale { get; set; }
        public string Content { get; set; }
        public int? Price { get; set; }
        public int? Amount { get; set; }
        public bool? IsSale { get; set; }
        public int? Discount { get; set; }
        [StringLength(100)]
        public string Price_Sale { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? From_Date_Sale { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? To_Date_Sale { get; set; }
        public bool? New { get; set; }
        public bool? Hot_Sale { get; set; }
        public bool? Status { get; set; }
        public string FileImages { get; set; }
        public string FileVideos { get; set; }
        [StringLength(50)]
        public string Update_By { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Update_Time { get; set; }
    }
}