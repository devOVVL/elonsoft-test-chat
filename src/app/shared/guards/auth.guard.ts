import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _destroy$ = new Subject<void>();
  public userSignedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
    this.authService.getUserSignedIn()
      .subscribe(
        res => {
          // console.log(res);
          this.userSignedIn = res;
        }
    )
    this._destroy$.next();
    this._destroy$.complete();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    switch (this.userSignedIn) {
      case true:
        this.router.navigate(['/chats']); 
        return true;
        break;
      case false:
        return false;
        break;
    }
  }
  
}
