using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class Product_ServiceRepository : Repository<Product_Service>, IProduct_ServiceRepository
    {
        public Product_ServiceRepository(GHFContext context) : base(context)
        {
        }
    }
}