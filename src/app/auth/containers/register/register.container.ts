import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.container.html',
  styleUrls: ['./register.container.scss']
})
export class RegisterContainer implements OnInit {

  public regForm: FormGroup;
  private _destroy$ = new Subject<void>();

  public emailToNewUser = '';

  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.getUserData()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.emailToNewUser = res['email']
      }
    )
    this.regForm = this.fb.group({
      'email': [this.emailToNewUser, [Validators.required, Validators.email] ],
      'name': ['', Validators.required]
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
    this.authService.registerUser({
      email: cf['email'],
      name: cf['name']
    })
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          console.log(res)
          switch (res) {
            case true:
              console.log('to-chats')
              break;
            // case false:
            //   break;
          }
        }
    )
  }

}
