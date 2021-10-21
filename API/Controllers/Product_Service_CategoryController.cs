using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;
using Aspose.Cells;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class Product_Service_CategoryController : ApiController
    {
        private readonly IProduct_Service_CategoryService _product_Service_CategoryService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        // private OperationResult operationResult;

        public Product_Service_CategoryController(
            IProduct_Service_CategoryService product_Service_CategoryService, 
            IWebHostEnvironment webHostEnvironment)
        {
            _product_Service_CategoryService = product_Service_CategoryService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct ([FromBody] Product_Service_Category_Dto model)
        {
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            model.Update_Time = DateTime.Now;
            var result = await _product_Service_CategoryService.CreateProduct_Service_Cate(model);
            return Ok(result);
        }
        
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllProduct (string text, [FromQuery] PaginationParams pagination)
        {
            var result = await _product_Service_CategoryService.GetallProduct_Service_Cate(text, pagination);
            return Ok(result);
        }
        [HttpGet("getid")]
        public async Task<IActionResult> GetIDProduct (string id)
        {
            var result = await _product_Service_CategoryService.GetIDProduct_Service_Cate(id);
            return Ok(result);
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProduct ([FromQuery] string id)
        {
            var result = await _product_Service_CategoryService.DeleteProduct_Service_Cate(id);
            return Ok(result);
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct ([FromBody] Product_Service_Category_Dto model)
        {
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            model.Update_Time = DateTime.Now;
            var result = await _product_Service_CategoryService.UpdateProduct_Service_Cate(model);
            return Ok(result);
        }
        [HttpGet("excelaspose")]
        public async Task<IActionResult> GetAllProductToExcel ( string text, [FromQuery] PaginationParams pagination, int checkExport)
        {
            var data = await _product_Service_CategoryService.GetallProduct_Service_Cate(text, pagination, false);
            // get path
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources\\Template\\ProductServiceCategory\\ProductServiceCategoryListTemplate.xlsx");
            //using workbookdesigner
            WorkbookDesigner designer = new WorkbookDesigner();
            //using workbookdesigner for path
            designer.Workbook = new Workbook(path);
            // làm việc với sheets 0
            Worksheet ws = designer.Workbook.Worksheets[0];
            // insert data vào sheets 0 này dựa vào &result
            designer.SetDataSource("result", data.Result);
            designer.Process();

            //insert sequence number
            var index = 2;
            for (int i = 0; i < data.Result.Count; i++)
            {
                ws.Cells["A" +index].PutValue(i+1);
                index++;
            }
            //insert tick on status
            var index2 = 1;
            foreach (var item in data.Result)
            {
                string file = "";
                if (item.Status == true)
                    file = _webHostEnvironment.WebRootPath + "\\icons\\ok-512.png";
                else
                    file = _webHostEnvironment.WebRootPath + "\\icons\\circle-outline-512.png";
                Aspose.Cells.Drawing.Picture pic = ws.Pictures[ws.Pictures.Add(index2, 3, file)];
                pic.Height = 20;
                pic.Width = 20;
                pic.Top = 5;
                pic.Left = 40;
                index2++;
            }

            //save workbook
            MemoryStream stream = new MemoryStream();
            string fileKind = "";
            string fileExtension = "";


            //excell
            if(checkExport ==1){
                fileKind = "application/xlsx";
                fileExtension = ".xlsx";
                designer.Workbook.Save(stream, SaveFormat.Xlsx);
            } else{
                ws.PageSetup.FitToPagesTall  = 0;
                ws.PageSetup.PaperSize = PaperSizeType.PaperA4;
                ws.PageSetup.PrintQuality = 1200;
                ws.PageSetup.SetHeader(0, "&D &T");
                ws.PageSetup.SetHeader(2, "&B Product and Service Category");
                ws.PageSetup.SetFooter(1, "&B GHF");
                ws.PageSetup.SetFooter(2, "&P/&N");

                fileKind = "application/pdf";
                fileExtension = ".pdf";
                designer.Workbook.Save(stream, SaveFormat.Pdf);
            }

            byte[] result = stream.ToArray();
            return File(result,fileKind,"Product_Service_Category_" + DateTime.Now.ToString("dd_MM_yyyy") + fileExtension);
        }
        
        [HttpPost("uploadexcel")]
        public async Task<IActionResult> UploadExcel ( IFormFile file)
        {  
            var update_By = User.FindFirst(ClaimTypes.Name).Value;
            var result = await _product_Service_CategoryService.UploadExcel(file, update_By);
            return Ok(result);
        }
        [HttpPost("deletemultiple")]
        public async Task<IActionResult> DeleteMultiple ( List<Product_Service_Category_Dto> listModel)
        {
            var result = await _product_Service_CategoryService.DeleteMultiple(listModel);
            return Ok(result);
        }
    }
}