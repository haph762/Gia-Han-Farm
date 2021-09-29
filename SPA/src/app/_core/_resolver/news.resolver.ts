import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { News } from '../_models/news';
import { AlertUtilityService } from '../_services/alert-utility.service';
import { NewsService } from '../_services/news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver implements Resolve<News[]> {
  pageNumber =1;
  pageSize =6;
  text='';
  constructor(
    private newsService: NewsService,
    private router: Router,
    private alertService: AlertUtilityService,
    private spinnerService: NgxSpinnerService
  ){}
  resolve(route: ActivatedRouteSnapshot): Observable<News[]> {
    this.spinnerService.show();
    return this.newsService.getNews(this.pageNumber, this.pageSize, this.text).pipe(
      tap(() => this.spinnerService.hide()),
      catchError(() => {
        this.alertService.error('Error','Problem retrieving data');
        this.router.navigate(['/dashboard']);
        this.spinnerService.hide();
        return of(null);
      })
    );
  }
}
