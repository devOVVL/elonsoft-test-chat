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

    if (!this.localChats.includes(chatKey)) {
      this.localChats.push(chatKey);
      
      this.chats$.next(this.localChats);
      this.localStorage.setItem(this.chatsKey, this.localChats);

      this.localStorage.setItem(chatKey, [{
          sender: 'system', //email
          text: 'Welcome to ' + chatKey + ' chat',
          date: new Date().toString().slice(4, 15),
          time: new Date().toString().slice(16, 21)
        }]
      );
    }
    return this.chats$.asObservable();
  }

  public getChat(chatKey: string): Observable<any> {
    this.chat$.next(this.localStorage.getItem(chatKey, true));
    return this.chat$.asObservable();
  }

  public addMessageToChat(chatKey: string, message: {
    sender: string,
    text: string,
    date: string,
    time: string
  }): Observable<any> {
    let chat = this.localStorage.getItem(chatKey, true);
    chat.push(message);
    this.localStorage.setItem(chatKey, chat);
    this.chat$.next(this.localStorage.getItem(chatKey, true));
    return this.chat$.asObservable();
  }

}
