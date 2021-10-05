import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { News } from '../../../_core/_models/news';
import { AlertUtilityService } from '../../../_core/_services/alert-utility.service';
import { NewsService } from '../../../_core/_services/news.service';
import { commonPerProject } from '../../../_core/_untility/common-per-project';

@UntilDestroy()
@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent implements OnInit {

  urlImage: string = commonPerProject.imageNews;
  defaultImage: string = commonPerProject.imageUrl + "no-image.jpg";
  oldimage3: string = this.defaultImage; 
  oldimage2: string = this.defaultImage; 
  oldimage1: string = this.defaultImage;  
  image3: string = this.defaultImage; 
  image2: string = this.defaultImage; 
  image1: string = this.defaultImage;  
  news_id: number;
  news: News = {} as News;
  existImage1: boolean = false;
  existImage2: boolean = false;
  existImage3: boolean = false;
  newImages: boolean = false;
  oldImages: boolean = true;
  addImage2: boolean = false;
  addImage3: boolean = false;
  constructor(
    private newsService: NewsService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertUtilityService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.news_id = this.route.snapshot.params['news_id'];
    this.loadNewsByID();
  }

  loadNewsByID(){
    this.spinnerService.show();
    this.newsService.getnewsbyid(this.news_id).pipe(untilDestroyed(this)).subscribe(res => {
      this.spinnerService.hide();
      this.news = res;
      if(this.news.image != null){
        if(this.news.urlImages[0] != ""){
          this.oldimage1 =this.urlImage + this.news.urlImages[0];
        }
        if(this.news.urlImages[1] != ""){
          this.oldimage2 =this.urlImage + this.news.urlImages[1];
          this.existImage2 = true;
        }
        if(this.news.urlImages[1] != "" && this.news.urlImages[2] != ""){
          this.oldimage3 =this.urlImage + this.news.urlImages[2];
          this.existImage3 = true;
        }
      }
    }, error =>{
      console.log(error);
      this.spinnerService.hide();
    });
  }
  uploadNewImages(){
    this.oldImages = false;
    this.newImages = true;
  }
  undoImages(){
    this.oldImages = true;
    this.newImages = false;
  }
  onSelectFile(event, number){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      const file = event.target.files[0];

      // check file name extension
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      if (fileNameExtension != 'jpg' && fileNameExtension != 'jpeg'
        && fileNameExtension != 'png' && fileNameExtension != 'JPG'
        && fileNameExtension != 'JPEG' && fileNameExtension != 'PNG') {
        this.alertService.warning('File not image', 'Please select a file .jpg, .png, .jpeg');
        return;
      }
      // Images cannot be larger than 2MB
      const fileZise = event.target.files[0].size;
      if (fileZise > 6097152) {
        this.alertService.warning('File is too big','Please select a Images cannot be larger than 5MB');
        return;
      }
      //show images
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        if (number == 0) {
          this.image1 = event.target.result.toString();
          this.news.file1 = file;
          this.addImage2 = true;
          this.uploadNewImages();
        }else if (number == 1) {
          this.image1 = event.target.result.toString();
          this.news.file1 = file;
          this.addImage2 = true;
        } else if (number == 2) {
          this.image2 = event.target.result.toString();
          this.news.file2 = file;
          this.addImage3 = true;
        } else {
          this.image3 = event.target.result.toString();
          this.news.file3 = file;
        }
      };
    }
  }
  deleteImage(number) {
    if (number == 1) {
      this.image1 = this.defaultImage;
      this.news.file1 = null;

      this.image2 = this.defaultImage;
      this.news.file2 = null;
      this.addImage2 =false;

      this.image3 = this.defaultImage;
      this.news.file3 = null;
      this.addImage3 = false;
    } else if (number == 2) {
      this.image2 = this.defaultImage;
      this.news.file2 = null;

      this.image3 = this.defaultImage;
      this.news.file3 = null;
      this.addImage3 = false;
    } else {
      this.image3 = this.defaultImage;
      this.news.file3 = null;
    }
  }
  saveNews(){
    this.spinnerService.show();
    if(this.news.title == null || this.news.title == ''){
      this.spinnerService.hide();
      return this.alertService.error('Error', 'Title cannot be empty');
    }
    if(this.news.short_Description == null || this.news.short_Description == ''){
      this.spinnerService.hide();
      return this.alertService.error('Error', 'Short description cannot be empty');
    }
    this.newsService.updateNews(this.news).pipe(untilDestroyed(this)).subscribe(res =>{
      if(res.success)
      {
        this.spinnerService.hide();
        this.alertService.success('Successfuly', res.message);
        this.router.navigateByUrl('/posts/news/list');
      }else{
        this.spinnerService.hide();
        this.alertService.error('Error', res.message);
      }
    }, error =>{
      this.spinnerService.hide();
      console.log(error);
    });
  }
  clear(){
    this.news.title ='';
    this.news.short_Description='';
    this.news.contents='';
    this.image2 =this.defaultImage;
    this.image1 =this.defaultImage;
    this.image3 =this.defaultImage;
    this.news.file1 = null;
    this.news.file2 = null;
    this.news.file3 = null;
    this.addImage2 = false;
    this.addImage3 = false;
    this.uploadNewImages();
  }
  cancel(){
    this.loadNewsByID();
    this.oldImages = true;
    this.newImages = false;
    this.deleteImage(1);
  }

}
