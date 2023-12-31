// import { SupabaseClient, User } from '@supabase/supabase-js';
import { Component, OnInit } from '@angular/core';
import { SupaService } from '../supa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:any
  users:any
  editedUser: any = {};
  showedit:boolean=false
  constructor(
    private auth :SupaService,
    // private supabaseClient: SupabaseClient
    
  ) { }

  ngOnInit() {

    this.auth.currentUser.subscribe((data)=>{
    console.log(data)
    this.auth.users.subscribe(data=>{
      console.log(data)
      this.users= data
    })
  //  this.loadUsers()
    })
  }


  signout(){
    this.auth.logout()
  }


  deleteUser(id:any){
    this.auth.deleteUser(id)

  }

  editUser(user: any) {
    // Assign the entire user object to the editedUser for editing
    this.editedUser = { ...user };
    this.showedit = true;
  }
  // loadUsers() {
  //   this.supabaseClient.from('users').select('*').then(({ data, error }) => {
  //     if (error) {
  //       console.error('Error fetching users:', error);
  //     } else {
  //       this.users = data
        
  //      console.log(this.users)
  //     }
  //   });
  // }
  

  saveEditedUser() {
    this.auth.saveEditedUser(this.editedUser).then(({ data, error }) => {
      if (error) {
        console.error('Error updating user:', error);
      } else {
        console.log('User updated successfully');
  
        this.editedUser = {};
      }
    });
  }

  add(){}
}
