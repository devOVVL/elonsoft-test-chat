import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { LocalStorageService } from '@newteq/ngx-local-storage';

import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  public chats$: BehaviorSubject<any> = new BehaviorSubject([]);
  public chat$: BehaviorSubject<any> = new BehaviorSubject([]);;
  public chatsKey = 'chats';

  public localChats = [];

  constructor(
    private localStorage: LocalStorageService
  ) { 
    if (this.localStorage.getItem(this.chatsKey, true)) {
      this.chats$.next(this.localStorage.getItem(this.chatsKey, true));
    } else {
      this.localStorage.setItem(this.chatsKey, []);
    }
  }

  public getChatsKeys(): Observable<any> {
    return this.chats$.asObservable();
  }

  public addNewChat(chatKey: string): Observable<any> {

    this.localChats = this.localStorage.getItem(this.chatsKey, true);
    this.localChats.push(chatKey)

    this.chats$.next(this.localChats);
    this.localStorage.setItem(this.chatsKey, this.localChats);

    this.localStorage.setItem(chatKey, []);

    return this.chats$.asObservable();
  }

  public getChat(chatKey: string): Observable<any> {
    this.chat$.next(this.localStorage.getItem(chatKey, true));
    return this.chat$.asObservable();
  }
}
