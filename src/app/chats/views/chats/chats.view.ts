import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from '@newteq/ngx-local-storage';

import * as _ from 'underscore';

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
  public avatarInitials = '';
  public activeChatKey = '';

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {
    let users = this.localStorage.getItem('users', true);
    let email = this.localStorage.getItem('last_user', true);
    let index = _.findIndex(users, { 'email': email });

    this.userData = users[index];
    // console.log(this.userData)
  }

  ngOnInit(): void {
    if (this.userData.name.split(' ').length >= 2) {
      for (let word of this.userData.name.split(' ')) {
        this.avatarInitials += word[0];
      }
    } else {
      this.avatarInitials = this.userData.name[0];
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clickToChat(item: string) {
    this.activeChatKey = item;
  }

  public logOut() {
    this.authService.logOutUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.router.navigate(['/auth/login']);
        }
    )
  }

}
