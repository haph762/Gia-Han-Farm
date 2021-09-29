import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsGuard } from '../../_core/_guard/news.guard';
import { NewsResolver } from '../../_core/_resolver/news.resolver';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsUpdateComponent } from './news-update/news-update.component';

const routes: Routes = [
  {
    path:'list',
    data: { title: 'News List' },
    resolve: {NewsData: NewsResolver},
    canActivate: [NewsGuard],
    component: NewsListComponent,
  },
  {
    path:'add',
    data: { title: 'Add News' },
    canActivate: [NewsGuard],
    component: NewsAddComponent,
  },
  {
    path:'edit/:news_id',
    data: { title: 'Edit News' },
    canActivate: [NewsGuard],
    component: NewsUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
