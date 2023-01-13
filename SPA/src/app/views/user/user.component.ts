import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnotifyPosition } from 'ng-snotify';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { RoleUserAuthorize } from '../../_core/_models/role-user';
import { Users } from '../../_core/_models/users';
import { AlertUtilityService } from '../../_core/_services/alert-utility.service';
import { UserService } from '../../_core/_services/user.service';
import { Pagination } from '../../_core/_untility/pagination';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('addUserModal') addUserModal: ModalDirective;
  @ViewChild('authorizeModal') authorizeModal: ModalDirective;
  users: Users[];
  user: Users = {} as Users;
  file: File;
  roles: RoleUserAuthorize[] = [];
  isAllRolesChecked: boolean = false;
  pagination: Pagination;
  text: string = '';
  flag: number;
  imageUserDefault: string = '../../../assets/img/avatars/user.png';
  imageUserUrl: string = environment.baseUrl + '/uploaded/images/user/';
  imageUser: any = '';
  currentUser: Users = JSON.parse(localStorage.getItem('user'));
  registrationForm = this.fb.group({
    file: [null]
  });
  editFile: boolean = true;
  removeUpload: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertUtilityService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.data.subscribe(data => {
      this.users = data.dataUser.result;
      this.pagination = data.dataUser.pagination;
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize, this.text)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        console.log(error);
      }
      );
  }

  clear() {
    this.text = '';
    this.loadUsers();
    this.pagination.currentPage = 1;
  }

  deleteUser(account: string) {
    this.alertService.confirmDelete("Are you sure you want to delete account '" + account.toUpperCase() + "' ?", SnotifyPosition.centerCenter, () => {

      //administrator can't be removed
      if (account == 'administrator') {
        this.alertService.error('Error', 'User administrator cannot be deleted!');
      } else if (account == this.currentUser.user_Account) {
        this.alertService.error('Error', 'The current user cannot be deleted!');
      } else {
        this.spinnerService.show();
        this.userService.deleteUser(account)
          .pipe(untilDestroyed(this))
          .subscribe(res => {
            this.spinnerService.hide();
            if (res.success) {
              if (this.pagination.currentPage == 2 && this.pagination.totalCount == 11) {
                this.pagination.currentPage = 1;
              }
              this.loadUsers();
              this.alertService.success("Deleted", res.message);
            } else {
              this.alertService.error("Error!", res.message);
            }
          }, error => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
    });
  }

  setUser(user: Users) {
    this.user = { ...user };
    this.imageUser = user.image !== null ? this.imageUserUrl + user.image
      : this.imageUserDefault;

  }

  setAuthorizeList() {
    this.spinnerService.show();
    this.userService.getRoleUser(this.user.user_Account)
      .pipe(untilDestroyed(this))
      .subscribe((roles: RoleUserAuthorize[]) => {
        this.roles = roles;
        this.checkIfAllRolesChecked();
        this.spinnerService.hide();

      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  checkIfAllRolesChecked() {
    let isChecked = true;
    this.roles.forEach(role => {
      if (!role.status)
        isChecked = false;
    });
    if (isChecked)
      this.isAllRolesChecked = true;
    else
      this.isAllRolesChecked = false;
  }

  roleChanges(role: RoleUserAuthorize) {
    role.status = !role.status;
    this.checkIfAllRolesChecked();
  }

  allRolesChanges() {
    this.isAllRolesChecked = !this.isAllRolesChecked;
    if (this.isAllRolesChecked) {
      this.roles.forEach(role => {
        role.status = true;
      });
    } else {
      this.roles.forEach(role => {
        role.status = false;
      });
    }
  }

  authorizeSave() {
    this.spinnerService.show();
    this.userService.updateRoles(this.roles)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res.success) {
          this.spinnerService.hide();
          this.alertService.success("Successfuly!", res.message);
          this.authorizeModal.hide();
          this.loadUsers();
        } else {
          this.alertService.error("Error!", res.message);
        }
      }, error => {
        this.spinnerService.hide();
      });
  }

  setFlag(flag: number) {
    this.flag = flag;
  }

  resetUser() {
    this.user.user_Account = '';
    this.user.user_Name = "";
    this.user.password = "";
    this.user.email = "";
    this.user.phone_Number = "";
    this.imageUser = this.imageUserDefault;
  }

  addOrEditUser() {
    if (!this.validate())
      return;
    //add
    if (this.flag == 0) {
      this.spinnerService.show();
      this.userService.addUser(this.user, this.file)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          this.spinnerService.hide();
          if (res.success) {
            this.alertService.success("Successfuly!", res.message);
            this.loadUsers();
            this.addUserModal.hide();
          } else {
            this.alertService.error("Error!", res.message);
          }
        }, error => {
          console.log(error);
          this.spinnerService.hide();
        });
    } else {
      //edit
      this.spinnerService.show();
      this.userService.updateUser(this.user, this.file)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          this.spinnerService.hide();
          if (res.success) {
            this.alertService.success("Successfuly!", res.message);
            this.loadUsers();
            this.addUserModal.hide();
          } else {
            this.alertService.error("Error!", res.message);
          }
        }, error => {
          console.log(error);
          this.spinnerService.hide();
        });
    }
  }

  validate() {
    if (this.user.user_Account === null || this.user.user_Account.trim() === '') {
      this.alertService.error('Error!', 'Invalid User Account'); return false;
    }
    if (this.user.user_Name === null || this.user.user_Name.trim() === '') {
      this.alertService.error('Error!', 'Invalid User Name'); return false;
    }
    if (this.user.email === null || this.user.email.trim() === '') {
      this.alertService.error('Error!', 'Invalid Email'); return false;
    }
    if (this.user.phone_Number === null || this.user.phone_Number.trim() === '') {
      this.alertService.error('Error!', 'Invalid Phone number'); return false;
    }

    this.user.user_Account = this.user.user_Account.trim();
    this.user.user_Name = this.user.user_Name.trim();
    this.user.email = this.user.email.trim();
    this.user.phone_Number = this.user.phone_Number.trim();

    return true;
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.file);

      //When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUser = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    if (this.user.image === undefined)
      this.user.image = null;
    this.imageUser = this.user.image !== null ? this.imageUserUrl + this.user.image
      : this.imageUserDefault;
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
}
