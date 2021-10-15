import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductAndServiceCate } from '../_models/productandservicecate';
import { OperationResult } from '../_untility/operation-result';
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
  addCategory(productandservice: ProductAndServiceCate){
    return this.http.post<OperationResult>(this.baseUrl +'Product_Service_Category/create', productandservice, {});
  }
  editCategory(productandservice: ProductAndServiceCate){
    return this.http.put<OperationResult>(this.baseUrl +'Product_Service_Category/update', productandservice, {});
  }
  deleteCategory(id: string){
    let params = new HttpParams().set('id', id);
    return this.http.delete<OperationResult>(this.baseUrl +'Product_Service_Category/delete', {params});
  }
  exportExcel(pageNumber: number, pageSize: number, text: string, checkExport: number){
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('text', text)
      .set('checkExport', checkExport.toString());
    return this.http.get(this.baseUrl + 'Product_Service_Category/excelaspose', {responseType: 'blob', params})
      .subscribe((result: Blob) => {
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();

        let fileExtension = checkExport === 1 ? '.xlsx' : '.pdf';
        let filename = "Product_and_Service_Category_" + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim();

        link.href = url;
        link.setAttribute('download', filename + fileExtension);
        document.body.appendChild(link);
        link.click();
      });
  }
  uploadExcel(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<OperationResult>(this.baseUrl +'Product_Service_Category/UploadExcel', formData, {});
  }
  deleteMultiple(listModel : ProductAndServiceCate[]){
    return this.http.post<OperationResult>(this.baseUrl +'Product_Service_Category/deletemultiple', listModel);
  }
}
