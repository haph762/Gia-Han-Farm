#nullable disable

namespace API.Dtos
{
    public class Product_Service_Category_Dto
    {
        public string Product_Service_Cate_ID { get; set; }
        public string Product_Service_Cate_Name { get; set; }
        public bool? Status { get; set; }
        public int Position { get; set; }
        public string Update_By { get; set; }
        public DateTime? Update_Time { get; set; }
        public bool Checked {get; set; }
    }
}