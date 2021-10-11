import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductandservicecateGuard } from '../../../_core/_guard/productandservicecate.guard';
import { ProductandservicecateResolver } from '../../../_core/_resolver/productandservicecate.resolver';
import { ProductandservicecateListComponent } from './productandservicecate-list/productandservicecate-list.component';

const routes: Routes = [
  {
    path:'',
    data: {title: 'Product and Service category'},
    component: ProductandservicecateListComponent,
    resolve: {dataProduct: ProductandservicecateResolver},
    canActivate: [ProductandservicecateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductandservicecategoryRoutingModule { }
