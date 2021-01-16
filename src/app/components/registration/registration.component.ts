import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm : FormGroup;
  constructor(private fb : FormBuilder, private auth : AuthService) { 
    this.registrationForm = this.fb.group({
      "Name" : ["", Validators.required],
      "Password" : ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  Register(){
    this.auth.Register(this.registrationForm.value).subscribe(
      (data) => (alert("Please proceed to login.")),
      (error) => (alert(`An error has occured. ${error.error["error"]}`))
  )}

  get Name(){
    return this.registrationForm.get("Name");
  }

  get Password(){
    return this.registrationForm.get("Password");
  }
}
