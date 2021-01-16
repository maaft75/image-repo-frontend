import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router) { 
    this.loginForm = this.fb.group({
      "Name" : ["", Validators.required],
      "Password" : ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  Login(){
    this.auth.Login(this.loginForm.value).subscribe(
      (data) => {
        this.auth.saveUser(data.id);
        this.auth.saveToken(data.token);
        window.location.href = environment.frontBaseUrl + "dashboard"
      },
      (error) => { 
        alert(`An error has occured ${error.error["error"]}`);
        location.reload();
      }
  )}

  get Name(){
    return this.loginForm.get("Name");
  }

  get Password(){
    return this.loginForm.get("Password");
  }
}

