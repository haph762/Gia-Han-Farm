using System;
using System.Linq;
using System.Threading.Tasks;
using API._Repositories.Interfaces;
using API._Servieces.Interfaces;
using API.Dtos;
using API.Helpers.Params;
using API.Helpers.Utilities;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API._Servieces.Services
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IConfiguration _configuration;
        private OperationResult operationResult;

        public NewsService(INewsRepository newsRepository, 
            IMapper mapper, 
            MapperConfiguration mapperConfiguration, 
            IConfiguration configuration)
        {
            _newsRepository = newsRepository;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
            _configuration = configuration;
        }

        public async Task<OperationResult> CreateNews (News_Dto model)
        {
            var news = _mapper.Map<News>(model);
            _newsRepository.Add(news);
            try{
                await _newsRepository.Save();
                operationResult = new OperationResult{Success = true, Message="News was successfully added"};
            }catch(System.Exception){
                operationResult = new OperationResult {Success =false, Message ="failed on save!"};
            }
            return operationResult;
        }
        public async Task<int> CreateNewsID ()
        {
            var check = await  _newsRepository.FindAll().AsNoTracking().OrderByDescending(x => x.News_ID).FirstOrDefaultAsync();

            return check.News_ID + 1;
        }

        public async Task<PageListUtility<News_Dto>> GetAll(string text, PaginationParams pageParam)
        {
            var query =  _newsRepository.FindAll();
            if(!String.IsNullOrEmpty(text)){
                query = query.Where(x =>x.Title.Contains(text) || x.Short_Description.Contains(text));
            }
            var data = await  query.ProjectTo<News_Dto>(_mapperConfiguration).OrderByDescending(x =>x.Update_Time).ToListAsync();
            foreach (var item in data)
            {
                if(item.Image != null)
                {
                   item.UrlImages = item.Image.Split(';').ToList();
                }
            }
            return  PageListUtility<News_Dto>.PageList(data, pageParam.PageNumber, pageParam.PageSize);
        }

        public async Task<News_Dto> GetNewsByID(int news_id)
        {
            var data = await _newsRepository.FindAll(x => x.News_ID == news_id).ProjectTo<News_Dto>(_mapperConfiguration).FirstOrDefaultAsync();
                if(data.Image != null)
                {
                   data.UrlImages = data.Image.Split(';').ToList();
                }
            return data;
        }

        public async Task<OperationResult> RemoveNews(News_Dto model)
        {
            var query  = await _newsRepository.FindAll(x =>x.News_ID == model.News_ID).FirstOrDefaultAsync();
            if(query == null)
            {
                operationResult = new OperationResult{Success=false, Message="The news is not exist!"};
                return operationResult;
            }
            _newsRepository.Remove(query);
            try{
                await _newsRepository.Save();
                operationResult = new OperationResult{Success=true, Message="Delete News successful!"};
            }catch(System.Exception){
                operationResult = new OperationResult{Success=false, Message="failed on save!"};
            }
            return operationResult;
        }

        public async Task<OperationResult> UpdateNews(News_Dto model)
        {
            var query  = await _newsRepository.FindAll(x =>x.News_ID == model.News_ID).FirstOrDefaultAsync();
            if(query == null)
            {
                operationResult = new OperationResult{Success=false, Message="The news is not exist!"};
                return operationResult;
            }
            query.Title = model.Title;
            query.Short_Description = model.Short_Description;
            query.Contents = model.Contents;
            if(model.File != null){
                query.Image = model.Image;
            }
            query.Update_By = model.Update_By;
            query.Update_Time = model.Update_Time;
            _newsRepository.Update(query);
            try{
                await _newsRepository.Save();
                operationResult = new OperationResult{Success=true, Message="Update News successful!"};
            }catch(System.Exception){
                operationResult = new OperationResult{Success=false, Message="failed on save!"};
            }
            return operationResult;
        }
    }
}