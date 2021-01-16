import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userImages : any;
  constructor(private auth : AuthService, private imagesService : ImagesService) { }

  ngOnInit(): void {
    this.imagesService.GetImagesFromUser(Number(this.auth.getUser())).subscribe( 
      (data) => { this.userImages = data;} 
  )}

  deleteImage(id){
    this.imagesService.DeleteImage(id).subscribe(
      (data) => 
      { 
        alert("Image deleted.");
        location.reload();
      },
      (error) => 
      {
        alert("An error has occured, please retry.")
      }
  )}

}