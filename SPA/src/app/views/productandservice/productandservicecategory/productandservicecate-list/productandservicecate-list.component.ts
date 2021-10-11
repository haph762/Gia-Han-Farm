import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  pagination: Pagination;
  text:string ='';
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
        console.log(this.productAndServiceCate);
      }, error =>{
        this.spinnerService.hide();
        console.log(error);
      });
  }

}
