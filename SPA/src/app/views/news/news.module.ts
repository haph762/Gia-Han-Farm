import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NewsResolver } from '../../_core/_resolver/news.resolver';
import { NewsGuard } from '../../_core/_guard/news.guard';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsAddComponent,
    NewsUpdateComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers:[
    NewsResolver,
    NewsGuard,
  ]
})
export class NewsModule { }
