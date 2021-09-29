import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { News } from '../../../_core/_models/news';
import { AlertUtilityService } from '../../../_core/_services/alert-utility.service';
import { NewsService } from '../../../_core/_services/news.service';
import { commonPerProject } from '../../../_core/_untility/common-per-project';

@UntilDestroy()
@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  urlImage: string = commonPerProject.imageUrl + "no-image.jpg";
  image2: string = this.urlImage; 
  image3: string = this.urlImage; 
  image1: string = this.urlImage; 
  news: News = {} as News;
  constructor(
    private alertService: AlertUtilityService,
    private spinnerService: NgxSpinnerService,
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
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
        if (number == 1) {
          this.image1 = event.target.result.toString();
          this.news.file1 = file;
        } else if (number == 2) {
          this.image2 = event.target.result.toString();
          this.news.file2 = file;
        } else {
          this.image3 = event.target.result.toString();
          this.news.file3 = file;
        }
      };
    }
  }
  deleteImage(number) {
    if (number == 1) {
      this.image1 = this.urlImage; ;
      this.news.file1 = null;
    } else if (number == 2) {
      this.image2 = this.urlImage;
      this.news.file2 = null;
    } else {
      this.image3 = this.urlImage;
      this.news.file3 = null;
    }
  }
  saveNews(){
    this.spinnerService.show();
    this.newsService.addNews(this.news).pipe(untilDestroyed(this)).subscribe(res =>{
      if(res.success)
      {
        this.spinnerService.hide();
        this.alertService.success('Successfuly', res.message);
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
