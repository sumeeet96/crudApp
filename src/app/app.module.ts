import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Sign-in/Sign-in.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './Sign-up/Sign-up.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [	
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    HomeComponent,
      NavbarComponent
   ],
  imports: [BrowserModule, AppRoutingModule , CommonModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,MatButtonModule,MatSnackBarModule  ,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
