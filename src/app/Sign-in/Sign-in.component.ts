import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupaService } from '../supa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Sign-in',
  templateUrl: './Sign-in.component.html',
  styleUrls: ['./Sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm!:FormGroup
  constructor(
   private fb:FormBuilder,
   private supabase_service:SupaService,
   private router:Router
  ) { 

    this.signinForm = this.fb.group({
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
    this.supabase_service.signIn(this.signinForm.value.email,this.signinForm.value.password).then((res)=>{
      console.log(res)
      if(res.data?.user?.role=="authenticated"){
        this.router.navigate(['/home'])
      }
    })
    .catch((error:Error)=>console.log("Error", error))
  }

}
