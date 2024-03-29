#nullable disable
using System.Security.Claims;
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class NewsController : ApiController
    {
        private readonly INewsService _newsService;
        private readonly IRepositoryAccessor _repository;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public NewsController(INewsService newsService, IRepositoryAccessor repository, IFileService fileService, IMapper mapper)
        {
            _newsService = newsService;
            _repository = repository;
            _fileService = fileService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNews([FromBody] News_Dto model)
        {
            if (model.File != null && model.News_ID == null)
                model.Image = await _fileService.UploadFiles(model.File, model.News_ID + "_", @"\uploaded\images\news");
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            model.Update_Time = DateTime.Now;
            var result = await _newsService.CreateNews(model);
            return Ok(result);
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll(string text, [FromQuery] PaginationParams pageParam)
        {
            var result = await _newsService.GetAll(text, pageParam);
            return Ok(result);
        }
        [HttpGet("getnewsbyid")]
        public async Task<IActionResult> GetNewsByID([FromQuery] int news_id)
        {
            var result = await _newsService.GetNewsByID(news_id);
            return Ok(result);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteNews([FromQuery] News_Dto model)
        {
            var image = await _repository.New.FindAll(x => x.News_ID == model.News_ID)
                    .Select(x => x.Image)
                    .FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(image))
            {
                _fileService.DeleteFileUpload(image, @"\uploaded\images\news");
            }
            var result = await _newsService.RemoveNews(model);
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateNews([FromBody] News_Dto model)
        {
            if (model.File != null)
            {
                var image = await _repository.New.FindAll(x => x.News_ID == model.News_ID)
                    .Select(x => x.Image)
                    .FirstOrDefaultAsync();
                if (!string.IsNullOrEmpty(image))
                {
                    _fileService.DeleteFileUpload(image, @"\uploaded\images\news");
                }
                model.Image = await _fileService.UploadFiles(model.File, model.News_ID + "_", @"\uploaded\images\news");
            }
            model.Update_By = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            model.Update_Time = DateTime.Now;
            var result = await _newsService.UpdateNews(model);
            return Ok(result);
        }
    }
}