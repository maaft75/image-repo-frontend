import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { SearchComponent } from '../components/search/search.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { PostimageComponent } from '../components/postimage/postimage.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { ImagedetailsComponent } from '../components/imagedetails/imagedetails.component';


export const appRoutes : Routes = [
  {path:'home' , component : HomeComponent},
  {path:'login', component : LoginComponent},
  {path:'search', component: SearchComponent},
  {path:'addimage', component: PostimageComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'imagedetails/:id', component: ImagedetailsComponent},
  {path : '**', redirectTo : "/home", pathMatch : "full"}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule
  ],
  exports :[
    RouterModule
  ]
})

export class RoutingModule { }
