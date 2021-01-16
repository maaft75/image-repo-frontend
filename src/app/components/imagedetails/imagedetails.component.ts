import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/Interfaces/Image';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-imagedetails',
  templateUrl: './imagedetails.component.html',
  styleUrls: ['./imagedetails.component.css']
})
export class ImagedetailsComponent implements OnInit {

  image : Image;
  constructor(private activatedRoute : ActivatedRoute, private imageService : ImagesService) { }

  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(
      (params) => 
      {
        this.imageService.GetImage(params["id"]).subscribe(
        (data) => 
        {
          this.image = data;
          //console.log(this.image)
        })
      })
  }

  likeImage(){

  }

}
