using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class Product_Service_CategoryRepository : Repository<Product_Service_Category>, IProduct_Service_CategoryRepository
    {
        public Product_Service_CategoryRepository(GHFContext context) : base(context)
        {
        }
    }
}