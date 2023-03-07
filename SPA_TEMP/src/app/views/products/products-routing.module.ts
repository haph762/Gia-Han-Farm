import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sản phẩm',
    },
    component: ProductsComponent
  },
  {
    path: 'detail/:id',
    data: {
      title: 'Sản phẩm',
      subTitle: 'detail'
    },
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
