import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { News } from '../../../_core/_models/news';
import { AlertUtilityService } from '../../../_core/_services/alert-utility.service';
import { NewsService } from '../../../_core/_services/news.service';

@UntilDestroy()
@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent implements OnInit {

  news_id: number;
  news: News;
  constructor(
    private newsService: NewsService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertUtilityService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.news_id = this.route.snapshot.params['news_id'];
    this.newsService.getnewsbyid(this.news_id).pipe(untilDestroyed(this)).subscribe(res => {
      this.news = res;
    });
    
  }

}
