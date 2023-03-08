import { IndexComponent } from './views/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'index'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
      }
    ]
  },
  {
    path: 'admin',
    data: {
      title: 'admin'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  //{ scrollPositionRestoration: 'enabled' } go to top
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
