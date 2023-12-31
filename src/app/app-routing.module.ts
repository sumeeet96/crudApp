
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './Sign-up/Sign-up.component';
import { SignInComponent } from './Sign-in/Sign-in.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"login",component:SignInComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"home",component:HomeComponent, canActivate: [AuthGuard]},
  {path:"",redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
