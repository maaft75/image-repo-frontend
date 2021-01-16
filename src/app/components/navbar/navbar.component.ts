import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchParam : string = '';
  isLoggedIn : boolean;
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    let user = this.auth.getUser();
    if(user == null){
      this.isLoggedIn = false;
    }else{
      this.isLoggedIn = true;
    }
  }

  Logout(){
    localStorage.clear();
    window.location.href = environment.frontBaseUrl;
  }

  Search(){
    window.location.href = environment.frontBaseUrl + "search?q=" + this.searchParam;
  }
}
