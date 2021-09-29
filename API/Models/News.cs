using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class News
    {
        /// <summary>
        /// News_Id
        /// </summary>
        [Key]
        public int News_ID { get; set; }
        /// <summary>
        /// Title
        /// </summary>
        [StringLength(50)]
        public string Title { get; set; }
        /// <summary>
        /// Short_Description
        /// </summary>
        [StringLength(254)]
        public string Short_Description { get; set; }
        /// <summary>
        /// Contents
        /// </summary>
        [StringLength(4000)]
        public string Contents { get; set; }
        /// <summary>
        /// Image
        /// </summary>
        [StringLength(255)]
        public string Image { get; set; }
        /// <summary>
        /// Updated by user account
        /// </summary>
        [StringLength(50)]
        public string Update_By { get; set; }
        /// <summary>
        /// Updated datetime
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Update_Time { get; set; }
    }
}