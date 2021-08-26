import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../../_core/_guard/user.guard';
import { UserResolver } from '../../_core/_resolver/user.resolver';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserGuard],
    data: {title: 'User List'},
    resolve: {dataUser: UserResolver},
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
