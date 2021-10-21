using System.Linq;
using Aspose.Cells;
using System.Threading.Tasks;
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinqKit;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;

namespace API._Servieces.Services
{
    public class Product_Service_CategoryService : IProduct_Service_CategoryService
    {
        private readonly IProduct_Service_CategoryRepository _product_Service_CategoryRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private OperationResult operationResult;

        public Product_Service_CategoryService(
            IProduct_Service_CategoryRepository product_Service_CategoryRepository, 
            IMapper mapper, 
            MapperConfiguration mapperConfiguration, 
            IConfiguration configuration, 
            IWebHostEnvironment webHostEnvironment)
        {
            _product_Service_CategoryRepository = product_Service_CategoryRepository;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<OperationResult> CreateProduct_Service_Cate (Product_Service_Category_Dto model)
        {
            var query = await _product_Service_CategoryRepository.FindAll(x =>x.Product_Service_Cate_ID == model.Product_Service_Cate_ID)
                .AsNoTracking().FirstOrDefaultAsync();
            if(query != null){
                return operationResult = new OperationResult{Success = false, Message="Product already exists"};
            }
            model.Product_Service_Cate_ID = await CreateCategoryID();
            var data = _mapper.Map<Product_Service_Category>(model);
            _product_Service_CategoryRepository.Add(data);
            try{
                await _product_Service_CategoryRepository.Save();
                operationResult = new OperationResult{Success = true, Message ="Add product successfully"};
            } catch(System.Exception){
                operationResult = new OperationResult{Success = false, Message ="add product failed"};
            }
            return operationResult;
        }

        public async Task<OperationResult> DeleteProduct_Service_Cate(string id)
        {
            var query = await _product_Service_CategoryRepository.FindSingle(x =>x.Product_Service_Cate_ID == id);
            if(query == null)
            {
                operationResult = new OperationResult{Success = false, Message="Product does not exists"};
                return operationResult;
            }
            var data = _mapper.Map<Product_Service_Category>(query);
            _product_Service_CategoryRepository.Remove(data);
            try{
                await _product_Service_CategoryRepository.Save();
                operationResult = new OperationResult{Success = true, Message ="Delete product successfully"};
            }catch(System.Exception){
                operationResult = new OperationResult{Success = false, Message ="Delete product failed"};
            }
            return operationResult;
        }

        public async Task<PageListUtility<Product_Service_Category_Dto>> GetallProduct_Service_Cate(string text, PaginationParams pagination, bool isPaging)
        {
            var data = _product_Service_CategoryRepository.FindAll();
            var product_Service = PredicateBuilder.New<Product_Service_Category>(true);
            if(!string.IsNullOrEmpty(text))
            {
                product_Service.And(x => x.Product_Service_Cate_ID.Contains(text) || x.Product_Service_Cate_Name.Contains(text));
                data = data.Where(product_Service);
            }
            var result = await data.ProjectTo<Product_Service_Category_Dto>(_mapperConfiguration)
                .OrderByDescending(x => x.Update_Time).ToListAsync();
            return PageListUtility<Product_Service_Category_Dto>.PageList(result, pagination.PageNumber, pagination.PageSize, isPaging);
        }

        public async Task<Product_Service_Category_Dto> GetIDProduct_Service_Cate(string id)
        {
            var data = await _product_Service_CategoryRepository
                .FindAll(x => x.Product_Service_Cate_ID == id).ProjectTo<Product_Service_Category_Dto>(_mapperConfiguration)
                .FirstOrDefaultAsync();
            return data;
        }

        public async Task<OperationResult> UpdateProduct_Service_Cate(Product_Service_Category_Dto model)
        {
            var query = await _product_Service_CategoryRepository.FindAll(x =>x.Product_Service_Cate_ID == model.Product_Service_Cate_ID.Trim())
                .AsNoTracking().FirstOrDefaultAsync();
            if(query == null)
            {
                return new OperationResult{Success = false, Message="Product does not exists"};
            }
            var data = _mapper.Map<Product_Service_Category>(model);
            _product_Service_CategoryRepository.Update(data);
            try{
                await _product_Service_CategoryRepository.Save();
                operationResult = new OperationResult{Success= true, Message="Update product successfully"};
            }catch(System.Exception ex){
                operationResult = new OperationResult{Success = false, Message= ex.ToString()};
            }
            return operationResult;
        }

        public async Task<string> CreateCategoryID ()
        {
            string categoryID ="ProductService_";
            var query = await _product_Service_CategoryRepository.FindAll()
                .OrderByDescending(x =>x.Product_Service_Cate_ID).AsNoTracking().FirstOrDefaultAsync();
            if(query != null){
                var temp = Int32.Parse(query.Product_Service_Cate_ID.Substring(15));
                var tempID = (temp >=999) ? (temp +1).ToString() : 
                    (temp <999 && temp >=99) ? ("0" + (temp+1).ToString()) :
                    (temp<99 && temp>=9) ? ("00" + (temp +1).ToString()) : 
                    ("000"+(temp+1).ToString());
                categoryID = "ProductService_" + tempID; 
            }else{
                categoryID = "ProductService_0001";
            }
            
            return categoryID;

        }

        public async Task<OperationResult> UploadExcel(IFormFile file, string update_By)
        {
            if (file == null)
            {
                return new OperationResult { Message = "File not found.", Success = false };
            }
            //save file
            string fileNameExtension = Path.GetExtension(file.FileName).ToLower();
            string fileName = "Upload_Excel_ProductServiceCate." + fileNameExtension;

            string folder = _webHostEnvironment.WebRootPath + $@"\uploaded\excels\ProcutServiceCategory";
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            string filePath = Path.Combine(folder, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            // try
            // {
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
            // }
            // catch (Exception)
            // {
            //     throw;
            // }
            //read file
            // WorkbookDesigner designer = new WorkbookDesigner();
            // designer.Workbook = new Workbook(filePath);
            // Worksheet ws = designer.Workbook.Worksheets[0];
            // int rows = ws.Cells.MaxDataRow;
            // if (rows < 1)
            // {
            //     return new OperationResult { Message = "Excel Empty", Success = false };
            // }
            // for (int i = 1; i <= rows; i++)
            // {
            //     Product_Service_Category_Dto model = new Product_Service_Category_Dto();
            //     model.Product_Service_Cate_Name = ws.Cells[i, 0].Value.ToSafetyString().Trim();
            //     model.Status = Convert.ToBoolean(ws.Cells[i, 1].IntValue);
            //     model.Position = ws.Cells[i,2].Value.ToInt();
            //     model.Update_By = update_By;
            //     model.Update_Time = DateTime.Now;
            //     try
            //         {
            //             await CreateProduct_Service_Cate(model);
            //             operationResult = new OperationResult { Message = "Import succeeded", Success = true };
            //         }
            //         catch(System.Exception)
            //         {
            //             return new OperationResult { Message = "Import Failed", Success = false };
            //         }
            // }
                operationResult = new OperationResult{Success=false, Message="failed"};
            return await Task.FromResult(operationResult);
        }

        public async Task<OperationResult> DeleteMultiple(List<Product_Service_Category_Dto> listModel)
        {
            List<Product_Service_Category> category = new List<Product_Service_Category>();
            foreach (var item in listModel)
            {
                if(item.Checked == true){
                    category.Add(await _product_Service_CategoryRepository
                        .FindAll(x =>x.Product_Service_Cate_ID == item.Product_Service_Cate_ID).FirstOrDefaultAsync());
                }
            }
            if(category.Count() == 0){
                operationResult = new OperationResult{Success=false, Message="No0 data"};
                return operationResult;
            }
            _product_Service_CategoryRepository.RemoveMultiple(category);
            try{
                await _product_Service_CategoryRepository.Save();
                operationResult = new OperationResult{Success = true, Message ="Delete product successfully"};
            }catch(System.Exception){
                operationResult = new OperationResult{Success = false, Message ="Delete product failed"};
            }
            return operationResult;
        }
    }
}