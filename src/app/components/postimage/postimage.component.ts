import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images/images.service';



@Component({
  selector: 'app-postimage',
  templateUrl: './postimage.component.html',
  styleUrls: ['./postimage.component.css']
})
export class PostimageComponent implements OnInit {

  response : any;
  loggedInUser : any;
  selectedImage : any;
  imageForm : FormGroup;
  tryUploadImage : boolean = true;
  uploadingImage : boolean = true;
  completedUpload : boolean = false;
  defaultImageUrl : string = "/assets/download.png";

  constructor(private fb : FormBuilder, private imageService : ImagesService, private auth : AuthService, private storage : AngularFireStorage) {
      
    this.imageForm = this.fb.group({
      "title" : ["", Validators.required],
      "imageUrl" : ["", Validators.required],
      "tags" : ["", Validators.required],
      "price" : ["", Validators.required],
      "category" : ["", Validators.required],
      "status" : ["", Validators.required],
      "user" : this.fb.group({
        "id" : [],
        "name" : [],
        "password" : []
      })
    })
  }

  ngOnInit(): void { 

    this.auth.GetUserById(Number(this.auth.getUser())).subscribe(
      (data) => {
      this.loggedInUser = data;
      this.imageForm = this.fb.group({
        "title" : ["", Validators.required],
        "imageUrl" : ["", Validators.required],
        "tags" : ["", Validators.required],
        "price" : ["", Validators.required],
        "category" : ["", Validators.required],
        "status" : ["", Validators.required],
        "user" : {
          "id" : this.loggedInUser.id,
          "name" : this.loggedInUser.name,
          "password" : this.loggedInUser.password
        }
      })
    })
   }

  showPreview(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => this.defaultImageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.defaultImageUrl = "/assets/download.png";
      this.selectedImage = null;
    }
  }
  
  uploadImage(){
    this.uploadingImage = false;
    let filepath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    let fileRef = this.storage.ref(filepath);

    this.storage.upload(filepath, this.selectedImage).snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( (url) => {
        this.response = url;
        alert('Image Uploaded!');
        this.uploadingImage = true;
        this.tryUploadImage = false;
        this.completedUpload = true;
        this.imageForm.patchValue( { imageUrl : this.response });
      })
    })).subscribe()
  }

  postImage(){
    if(this.imageForm.valid){

      this.imageForm.patchValue( { imageUrl : this.response });
      this.imageService.AddImage(this.imageForm.value).subscribe(
        (data) => { 
          alert(`Image : "${data.title}" successfully saved.`);
          window.location.href = environment.frontBaseUrl + "dashboard";
        },
        (error) => { alert(error.error); location.reload()}
      )}
    else
    {
      alert("Kindly ensure all fields are filled and valid.");
    }
  }

  get title(){
    return this.imageForm.get('title');
  }

  get tags(){
    return this.imageForm.get('tags');
  }

  get price(){
    return this.imageForm.get('price');
  }

  get status(){
    return this.imageForm.get('status');
  }

  get imageUrl(){
    return this.imageForm.get('imageUrl');
  }

  get category(){
    return this.imageForm.get('imageUrl');
  }
}