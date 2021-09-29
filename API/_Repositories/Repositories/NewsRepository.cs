using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        public NewsRepository(ProjectContext context) : base(context)
        {
        }
    }
}