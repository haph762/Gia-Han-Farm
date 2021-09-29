import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../_constants/roles.constant';
import { Users } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class NewsGuard implements CanActivate {
  
  constructor (
    private router: Router
  ){}

  canActivate(): boolean {
    const user: Users = JSON.parse(localStorage.getItem('user'));
    if (user.roles.includes(Roles.sets_NewsList)) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
  
}
