import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../_constants/roles.constant';
import { Users } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor (
    private router: Router
  ){}
  canActivate(): boolean{
    const user: Users = JSON.parse(localStorage.getItem('user'));
    if(user.roles.includes(Roles.sets_UserList)){
      return true;
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
