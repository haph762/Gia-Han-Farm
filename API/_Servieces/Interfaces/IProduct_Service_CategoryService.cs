using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;
using Microsoft.AspNetCore.Http;

namespace API._Servieces.Interfaces
{
    public interface IProduct_Service_CategoryService
    {
        Task<OperationResult> CreateProduct_Service_Cate (Product_Service_Category_Dto model);
        Task<PageListUtility<Product_Service_Category_Dto>> GetallProduct_Service_Cate (string text, PaginationParams pagination, bool isPaging= true);
        Task<Product_Service_Category_Dto> GetIDProduct_Service_Cate (string id);
        Task<OperationResult> DeleteProduct_Service_Cate (string id);
        Task<OperationResult> DeleteMultiple (List<Product_Service_Category_Dto> listModel);
        Task<OperationResult> UpdateProduct_Service_Cate (Product_Service_Category_Dto model);
        Task<OperationResult> UploadExcel (IFormFile file, string update_By);

    }
}