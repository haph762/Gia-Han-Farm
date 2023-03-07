import { NewBlogComponent } from './../new-blog/new-blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBlogDetailComponent } from './new-blog-detail/new-blog-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tin tức',
    },
    component: NewBlogComponent

  },
  {
    path: 'detail/:id',
    data: {
      title: 'Tin tức',
      subTitle: 'Trang tin tức chi tiết'
    },
    component: NewBlogDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBlogRoutingModule { }
