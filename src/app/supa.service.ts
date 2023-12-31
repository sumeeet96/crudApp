import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleStrategy } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject, retryWhen } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupaService {
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private supabaseClient: SupabaseClient;
  currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);
  user: any;
  users: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);

  constructor(private snackBar: MatSnackBar) {
    this.supabaseClient = createClient(
      environment.supabase.url, environment.supabase.key);

    this.user = this.supabaseClient.auth.getUser();
    console.log(JSON.stringify(this.user));
  }

  signUp(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password })
      .then(response => {
        this.showSnackbar('Sign-up successful');
        return response;
      })
      .catch(error => {
        this.showSnackbar('Sign-up failed: ' + error.message);
        throw error;
      });
  }

  signIn(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password })
      .then(response => {
        if (response.error) {
          this.showSnackbar('Sign-in failed: ' + response.error.message);
          throw new Error('Sign-in failed: ' + response.error.message);
        } else {
          this.showSnackbar('Sign-in successful');
          this.currentUser.next(response.data.user)
         this.loadUsers()
          console.log("signi "+this.users)
          return response;
        }
      })
      .catch(error => {
        this.showSnackbar('Sign-in failed: ' + error.message);
        throw error;
      });
  }

  logout() {
    return this.supabaseClient.auth.signOut();
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


  loadUsers() {
    this.supabaseClient.from('users').select('*').then(({ data, error }) => {
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        this.user = data;
        this.users.next(data)
       return this.user
      }
    });
  }

  deleteUser(userId: number) {
    this.supabaseClient
      .from('users')
      .delete()
      .eq('id', userId)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error deleting user:', error);
        } else {
          console.log('User deleted successfully');
          this.loadUsers(); 
        }
      });
  }


  editedUser: any = {};

  saveEditedUser(user: any) {
    return this.supabaseClient
      .from('users')
      .update([{ ...user }])
      .eq('id', user.id);
  }


  addUser(newUser:any) {
    this.supabaseClient
      .from('users')
      .upsert([{ ...newUser }])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error adding user:', error);
        } else {
          console.log('User added successfully');
          this.loadUsers(); // Reload the user list after adding a user
           // Clear the form after adding a user
        }
      });
  }

}
