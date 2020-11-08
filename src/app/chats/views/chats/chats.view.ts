import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.view.html',
  styleUrls: ['./chats.view.scss']
})
export class ChatsView implements OnInit {

  private _destroy$ = new Subject<void>();
  public userData = {
    email: '',
    name: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.getUserData()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          console.log(res);
          this.userData = res;
        }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public logOut() {
    this.authService.logOutUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/auth/login']);
        },
        err => {
          console.log(err);
        }
    )
  }

  // public logOut() {
  //   this.authService.logOutUser();
  //   this.router.navigate(['/auth/login']);
  // }

}
