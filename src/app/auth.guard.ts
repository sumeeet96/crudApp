import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { SupaService } from './supa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: SupaService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.currentUser.value)
    return this.authService.currentUser.pipe(
      take(1),
      map(user=>{
        if(user){
          return true
        }
        return this.router.createUrlTree(['']) 
        
        
      })
    )
  }
  
}
