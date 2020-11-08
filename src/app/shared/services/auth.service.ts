import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { LocalStorageService } from '@newteq/ngx-local-storage';

import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userData: BehaviorSubject<Object> = new BehaviorSubject({
    'email': '',
    'name': ''
  });
  public keyUsers = 'users';
  public keyLastActiveUser = 'last_user'; // хранит логин
  public users = [];

  constructor(
    private localStorage: LocalStorageService
  ) { 
    if (this.localStorage.getItem(this.keyUsers, true)) {
      this.users = this.localStorage.getItem(this.keyUsers, true);
      console.log(this.users)

      if (this.localStorage.getItem(this.keyLastActiveUser, true)) {
        let index = _.findIndex(this.users, { 
          'email': this.localStorage.getItem(this.keyLastActiveUser, true) 
        });
        this.userData.next({
          'email': this.users[index]['email'],
          'name': this.users[index]['name']
        });
        this.userSignedIn$.next(true);
      }

    } else {
      this.localStorage.setItem(this.keyUsers, this.users);
    }
  }

  public logOutUser(): Observable<any> {
    this.localStorage.setItem(this.keyLastActiveUser, "");
    this.userData.next({
      'email': '',
      'name': ''
    });
    this.userSignedIn$.next(false);
    return this.userSignedIn$.asObservable();
  }

  public getUserSignedIn(): Observable<any> {
    return this.userSignedIn$.asObservable();
  }

  public getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  public logInUser(
    signInData: { email: string }
  ): Observable<boolean> {
    this.users = this.localStorage.getItem(this.keyUsers, true);
    let index = _.findIndex(this.users, { 'email': signInData.email });
    if (index != -1) {
      this.userData.next({
        'email': this.users[index]['email'],
        'name': this.users[index]['name']
      });
      this.localStorage.setItem(this.keyLastActiveUser, this.users[index]['email']);
      this.userSignedIn$.next(true);
    } else {
      this.userData.next({
        'email': signInData.email,
        'name': ''
      });
      this.userSignedIn$.next(false);
    }
    return this.userSignedIn$.asObservable();
  }

  public registerUser( signInData: { 
    email: string,
    name: string 
  }): Observable<any> {
    let subject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    let index = _.findIndex(this.users, { 
      'email': signInData.email,
      'name': signInData.name
    });
    if (index == -1) {
      this.users.push(signInData);
      this.localStorage.setItem(this.keyUsers, this.users);
    }
    this.logInUser({ 
      email: signInData.email
    }).subscribe(
      res => {
        subject.next(true);
      },
      err =>{
        subject.next(false);
      }
    );
    return subject.asObservable();
  }
}
