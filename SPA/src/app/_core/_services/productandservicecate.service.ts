import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductAndServiceCate } from '../_models/productandservicecate';
import { PaginationResult } from '../_untility/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductandservicecateService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getAll(pageNumber: number = 1, pageSize: number = 10, text: string = ''): Observable<PaginationResult<ProductAndServiceCate>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('text', text);
    return this.http.get<PaginationResult<ProductAndServiceCate>>(this.baseUrl + 'Product_Service_Category/GetAll', { params });
  }
}
