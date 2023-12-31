import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupaService } from '../supa.service';
import {MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Sign-up',
  templateUrl: './Sign-up.component.html',
  styleUrls: ['./Sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!:FormGroup
  issignUp:boolean=false;
  constructor(
   private fb:FormBuilder,
   private supabase_service:SupaService,
   private _snackBar: MatSnackBar,
   private router:Router
  ) { 

    this.signupForm = this.fb.group({
    email: fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: fb.control('', [Validators.required, Validators.minLength(7)]),
  });
  }

  ngOnInit() {
  }


  onSubmit(){
    this.supabase_service.signUp(this.signupForm.value.email,this.signupForm.value.password).then((res)=>{
      // this._snackBar.open('Register Successfully', 'close ');
     if(res){
      this.issignUp=true
     }
    })
  }

  returnlogin(){
    this.router.navigate(['/login'])
  }
}
