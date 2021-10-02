import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnotifyPosition } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { News } from '../../../_core/_models/news';
import { AlertUtilityService } from '../../../_core/_services/alert-utility.service';
import { NewsService } from '../../../_core/_services/news.service';
import { commonPerProject } from '../../../_core/_untility/common-per-project';
import { Pagination } from '../../../_core/_untility/pagination';

@UntilDestroy()
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  news: News[];
  text: string = '';
  pagination: Pagination;
  urlImage: string = commonPerProject.imageNews;
  defaultImage: string = commonPerProject.imageUrl + "no-image.jpg";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertUtilityService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe(data =>{
        this.news = data.NewsData.result;
        this.pagination = data.NewsData.pagination;
        this.spinnerService.hide();
      }, error =>{
        this.spinnerService.hide();
      });
  }

  pageChanged(event: any): void{
    this.pagination.currentPage = event.page;
    this.search();
    
  }
  search(){
    this.spinnerService.show();
    this.newsService.getNews(this.pagination.currentPage, this.pagination.pageSize, this.text)
      .pipe(untilDestroyed(this)).subscribe(res =>
        {
          this.news = res.result;
          this.pagination = res.pagination;
          this.spinnerService.hide();
        }, error =>{
          console.log(error);
          this.spinnerService.hide();
        });
  }
  clear(){
    this.text = '';
    this.pagination.currentPage = 1;
    this.search();
  }
  addNews(){
    this.router.navigateByUrl('/posts/news/add');
  }
  remove(news: News){
    this.alertService.confirmDelete("Are you sure you want to delete news '" + news.title.toUpperCase() + "' ?", SnotifyPosition.centerCenter, () =>{
        this.spinnerService.show();
        this.newsService.removeNews(news)
          .pipe(untilDestroyed(this))
          .subscribe(res =>{
            this.spinnerService.hide();
            if(res.success){
              this.alertService.success("Deleted", res.message);
              if(this.pagination.currentPage ==2 && this.pagination.totalCount == 7)
                {
                  this.pagination.currentPage = 1;
                }
              this.search();
            }else{
              this.alertService.error("Error!", res.message);
            }
          }, error =>{
            console.log(error);
            this.spinnerService.hide();
          });
    });
  }
}
