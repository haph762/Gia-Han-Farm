import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoleUserAuthorize } from '../_models/role-user';
import { Users } from '../_models/users';
import { OperationResult } from '../_untility/operation-result';
import { PaginationResult } from '../_untility/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getUsers(page?: number, pageSize?: number, text?: string){
    let params = new HttpParams();
    if(page != null && pageSize != null){
      params = params.set('pageNumber', page.toString())
        .set('pageSize', pageSize.toString())
        .set('text', text);
    }
    return this.http.get<PaginationResult<Users>>(this.baseUrl +'Users/getall' , {params});
  }
  updateUser(user: Users, file: File){
    const formData = new FormData();
      formData.append('user_Account', user.user_Account);
      if (user.password == null){
      formData.append('password', '');
      }else{
        formData.append('password', user.password);
      }
      formData.append('user_Name', user.user_Name);
      formData.append('email', user.email);
      formData.append('phone_Number', user.phone_Number);
      formData.append('file', file);
    return this.http.put<OperationResult>(this.baseUrl +'Users/update', formData);
  }
  addUser(user: Users, file: File){
    const formData = new FormData();
      formData.append('user_Account', user.user_Account);
      formData.append('password', user.password);
      formData.append('user_Name', user.user_Name);
      formData.append('email', user.email);
      formData.append('phone_Number', user.phone_Number);
      formData.append('file', file);
    return this.http.post<OperationResult>(this.baseUrl +'Users/create', formData);
  }
  deleteUser(account_user: string){
    let params = new HttpParams();
    params = params.set('user_account', account_user);
    return this.http.delete<OperationResult>(this.baseUrl + 'Users/delete', {params});
  }
  getRoleUser(account_user: string){
    let params = new HttpParams();
    params = params.set('user_account', account_user);
    return this.http.get(this.baseUrl + 'Users/getroles', {params});
  }
  updateRoles(rolesUser: RoleUserAuthorize[]){
    return this.http.put<OperationResult>(this.baseUrl + 'Users/updateroles', rolesUser);
  }
}
