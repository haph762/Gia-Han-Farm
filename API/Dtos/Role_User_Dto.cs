#nullable disable
namespace API.Dtos
{
    public class Role_User_Dto
    {
        public string User_Account { get; set; }
        public string Role_Unique { get; set; }
        public string Role_Name { get; set; }
        public string Role_Type { get; set; }
        public decimal Role_Sequence { get; set; }
        public bool Status { get; set; }
    }
}