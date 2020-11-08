import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss']
})

export class LoginContainer implements OnInit {

  public loginForm: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email] ]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf) {
    console.log(cf);
    this.authService.logInUser({
      email: cf['email']
    })
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          console.log(res)
          switch (res) {
            case true:
              console.log('to-chats')
              // this.router.navigate(['/chats']);
              break;
            case false:
              this.router.navigate(['/auth/register']);
              break;
          }
        }
    )
  } 

}
