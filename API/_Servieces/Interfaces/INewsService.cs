using System.Threading.Tasks;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;

namespace API._Servieces.Interfaces
{
    public interface INewsService
    {
        Task<OperationResult> CreateNews (News_Dto model);
        Task<PageListUtility<News_Dto>> GetAll (string text, PaginationParams pageParam);
        Task<News_Dto> GetNewsByID (int news_ID);
        Task<OperationResult> RemoveNews (News_Dto model);
        Task<OperationResult> UpdateNews (News_Dto model);
    }
}