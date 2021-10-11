import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../_constants/roles.constant';
import { Users } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class ProductandservicecateGuard implements CanActivate {

  constructor (
    private router: Router
  ){}
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user: Users = JSON.parse(localStorage.getItem('user'));
      if (user.roles.includes(Roles.sets_Product_Service_CategoryList)) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  
}
