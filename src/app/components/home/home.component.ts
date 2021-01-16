import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allImages : Array<any>;
  privateImages : Array<any>;
  constructor(private ImagesService : ImagesService) { }

  ngOnInit(): void {
    this.ImagesService.GetImages().subscribe(
      (data) => 
      {
        this.allImages = data;

        this.privateImages = this.allImages.filter(
        x => 
        {
            return x.status != "Private";
        });
      }
  )}

}
