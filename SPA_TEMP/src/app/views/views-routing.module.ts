import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Index'
    },
    loadChildren: () => import('./index/index.module').then(x => x.IndexModule)
  },
  {
    path: 'about-me',
    data: {
      title: 'About me',
    },
    loadChildren: () => import('./about-me/about-me.module').then(x => x.AboutMeModule)
  },
  {
    path: 'products',
    data: {
      title: 'Sản phẩm',
    },
    loadChildren: () => import('./products/products.module').then(x => x.ProductsModule)
  },
  {
    path: 'new-blog',
    data: {
      title: 'Tin tức',
    },
    loadChildren: () => import('./new-blog/new-blog.module').then(x => x.NewBlogModule)
  },
  {
    path: 'contact-me',
    data: {
      title: 'Liên hệ',
    },
    loadChildren: () => import('./contact-me/contact-me.module').then(x => x.ContactMeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
