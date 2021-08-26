import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { Roles } from './_core/_constants/roles.constant';

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
    const roles: string[] = user.roles;
    this.navItems = [];

    //navs
    const navItemDashboard = {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    };
    //users
    const navItemUser = {
      name: '1. Settings',
      url: 'settings',
      icon: 'icon-user',
      children: []
    };
    if (roles.includes(Roles.sets_UserList)) {
      const navItem = {
        name: '1.1 User List',
        url: '/settings/user-list',
        class: 'menu-margin'
      };
      navItemUser.children.push(navItem);
    }

    //push navs
    this.navItems.push(navItemDashboard);
    this.navItems.push(navItemUser);
    return this.navItems;
  }
}