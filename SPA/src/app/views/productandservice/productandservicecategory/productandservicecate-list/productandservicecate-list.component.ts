import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnotifyPosition } from 'ng-snotify';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductAndServiceCate } from '../../../../_core/_models/productandservicecate';
import { AlertUtilityService } from '../../../../_core/_services/alert-utility.service';
import { ProductandservicecateService } from '../../../../_core/_services/productandservicecate.service';
import { Pagination } from '../../../../_core/_untility/pagination';

@UntilDestroy()
@Component({
  selector: 'app-productandservicecate-list',
  templateUrl: './productandservicecate-list.component.html',
  styleUrls: ['./productandservicecate-list.component.scss']
})
export class ProductandservicecateListComponent implements OnInit {

  productAndServiceCate: ProductAndServiceCate[];
  modelCate: ProductAndServiceCate = {} as ProductAndServiceCate;
  pagination: Pagination;
  text:string ='';
  flag: number;
  checkedAll: boolean = false;
  fileImportExcel: File = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productandservicecateService: ProductandservicecateService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertUtilityService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe( data =>{
        this.spinnerService.hide();
        this.productAndServiceCate = data.dataProduct.result;
        this.pagination = data.dataProduct.pagination;
      }
    );
    this.loadData();
  }
  loadData(){
    this.spinnerService.show();
    this.productandservicecateService.getAll(this.pagination.currentPage, this.pagination.pageSize, this.text)
      .pipe(untilDestroyed(this))
      .subscribe( data => {
        this.spinnerService.hide();
        this.productAndServiceCate = data.result;
        this.pagination = data.pagination;
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
  }
  saveCategory(){
    this.spinnerService.show();
    if(this.flag === 0){
      this.productandservicecateService.addCategory(this.modelCate)
      .pipe(untilDestroyed(this))
      .subscribe(res =>{
        if(res.success){
          this.spinnerService.hide();
          this.alertService.success('Succeeded','Added products and services');
          this.loadData();
        }else{
          this.spinnerService.hide();
          this.alertService.error('fail', 'not saved the product');
        }
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
    }else{
      this.productandservicecateService.editCategory(this.modelCate)
      .pipe(untilDestroyed(this))
      .subscribe(res =>{
        if(res.success){
          this.spinnerService.hide();
          this.alertService.success('Succeeded','Changed products and services');
          this.loadData();
        }else{
          this.spinnerService.hide();
          this.alertService.error('fail', 'not saved the product');
        }
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
    }
    
  }
  clear(){
    this.text = '';
    this.pagination.currentPage =1;
    this.loadData();
  }
  setFlag(number: number){
    this.flag =number;//0 add, 1 update
    if(this.flag ===0){
      this.modelCate.product_Service_Cate_Name = '';
      this.modelCate.position = null;
      this.modelCate.status =false;
    }
  }
  setModel(model: ProductAndServiceCate){
    this.modelCate = { ...model };
  }
  delete(id: string, title: string){
    this.alertService.confirmDelete("Are you sure you want to delete Category '" + title.toUpperCase() + "' ?", SnotifyPosition.centerCenter, () =>{
      this.spinnerService.show();
      this.productandservicecateService.deleteCategory(id)
        .pipe(untilDestroyed(this))
        .subscribe(res =>{
          if(res.success){
            this.spinnerService.hide();
            this.alertService.success('Succeeded', res.message);
            if(this.pagination.currentPage ===2 && this.pagination.totalCount ===11)
              this.pagination.currentPage =1;
            this.loadData();
          }else{
            this.spinnerService.hide();
            this.alertService.error('Fail', res.message);
          }
        }, error =>{
          this.spinnerService.hide();
          console.log(error);
        });
    });
  }
  deleteAll(){
    if(this.productAndServiceCate.length == 0){
      return this.alertService.warning('No data', 'Warning');
    }
    if(this.productAndServiceCate.filter(c =>c.checked ===true).length === 0){
      return this.alertService.warning('No category has choose', 'Warning')
    }
    this.alertService.confirmDelete('Delete '+ this.productAndServiceCate.filter(x =>x.checked ===true).length +' items?',SnotifyPosition.centerCenter, ()=>{
      this.productAndServiceCate.forEach(x =>{
        if(x.checked === true){
          this.productandservicecateService.deleteCategory(x.product_Service_Cate_ID)
          .pipe(untilDestroyed(this))
          .subscribe(res =>{
            if(res.success){
              this.spinnerService.hide();
              if(this.pagination.currentPage ===2 && this.pagination.totalCount ===11)
                this.pagination.currentPage =1;
              this.loadData();
            }else{
              this.spinnerService.hide();
              return this.alertService.error('Fail', res.message);
            }
          }, error =>{
            this.spinnerService.hide();
            console.log(error);
          });
        }
      });
      this.alertService.success('Succeeded', 'Delete succeeded products cate');
      this.checkedAll = false;
      this.loadData();
    });
  }
  pageChanged(event: any){
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  changeStatus(model: ProductAndServiceCate){
    this.spinnerService.show();
    model.status = !model.status;
    this.productandservicecateService.editCategory(model)
      .pipe(untilDestroyed(this))
      .subscribe(res =>{
        if(res.success){
          this.spinnerService.hide();
          this.alertService.success('Succeeded','Changed products and services');
          this.loadData();
        }else{
          this.spinnerService.hide();
          this.alertService.error('fail', 'not saved the product');
        }
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
  }
  exportExcel(checkExport: number){
    if(this.productAndServiceCate.length > 0){
      this.productandservicecateService.exportExcel(this.pagination.currentPage, this.pagination.pageSize, this.text, checkExport)
    }
    else{
      return this.alertService.warning('No data', 'Warning');
    }
  }
  changeChecked(){
    if(this.productAndServiceCate.filter(x =>x.checked !== true).length !==0){
      this.checkedAll =false;
    }else{
      this.checkedAll = true;
    }
  }
  check(event: any){
    if(event.target.checked){
      this.productAndServiceCate.forEach(x =>x.checked = true);
    }else{
      this.productAndServiceCate.forEach(x =>x.checked = false);
    }
  }
  downloadExample(){
    window.location.href ='../../../../../assets/fileExcelTemplate/product_and_service_category.xlsx';
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const file = event.target.files[0];
      // check file name extension
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      if (fileNameExtension != 'xlsx' && fileNameExtension != 'xlsm') {
        this.onRemoveFile();
        this.alertService.warning('Warning', "Please select a file '.xlsx' or '.xls'", SnotifyPosition.centerCenter);
        return;
      }

      this.fileImportExcel = file;
    }
  }
  onRemoveFile() {
    (<HTMLInputElement>document.getElementById("input_uploadFile")).value = null;
    this.fileImportExcel = null;
  }
  uploadExcel(){
    this.spinnerService.show();
    this.productandservicecateService.uploadExcel(this.fileImportExcel)
      .pipe(untilDestroyed(this))
      .subscribe(res =>{
        if(res.success){
          this.spinnerService.hide();
          this.alertService.success('Succeed', res.message);
          this.loadData();
          this.onRemoveFile();
        }else{
          this.spinnerService.hide();
          this.alertService.error('Error', res.message);
        }
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
  }
}
