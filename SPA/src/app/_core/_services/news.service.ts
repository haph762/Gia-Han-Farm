import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { News } from '../_models/news';
import { OperationResult } from '../_untility/operation-result';
import { PaginationResult } from '../_untility/pagination';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getNews(page?: number, pageSize?: number, text?: string){
    let params = new HttpParams();
    if(page != null && pageSize != null){
      params = params.set('pageNumber', page.toString())
        .set('pageSize', pageSize.toString())
        .set('text', text);
    }
    return this.http.get<PaginationResult<News>>(this.baseUrl +'News/getall' , {params});
  }
  addNews(news: News){
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('short_Description', news.short_Description);
    formData.append('contents', news.contents);
    formData.append('file', news.file1);
    formData.append('file', news.file2);
    formData.append('file', news.file3);
    return this.http.post<OperationResult>(this.baseUrl + 'News/create', formData);
  }
  removeNews(news: News){
    let params = new HttpParams().set('news_ID', news.news_ID.toString());
    return this.http.delete<OperationResult>(this.baseUrl +'News/delete', {params});
  }
}
