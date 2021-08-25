import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';

@Injectable({
  providedIn: 'root'
})
export class NavItem {
  navItems: INavData[] = [];
  hasReport: boolean = false;
  hasUser: boolean = false;
  constructor() { }

  getNav() {
    //get user
    const user: any = JSON.parse(localStorage.getItem('user'));
    const roles: string[] = user.role;
    this.navItems = [];

    //navs
    const navItemDashboard = {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    };

    //push navs
    this.navItems.push(navItemDashboard);
    return this.navItems;
  }
}