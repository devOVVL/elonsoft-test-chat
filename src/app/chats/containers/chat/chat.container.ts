import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatsService } from '../../../shared/services/chats.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.container.html',
  styleUrls: ['./chat.container.scss']
})
export class ChatContainer implements OnInit {

  private _destroy$ = new Subject<void>();

  @Input('chatKey') chatKey = '';
  @Input('sender') sender = {
    email: '',
    name: ''
  };
  public newMessageForm: FormGroup;

  public chat = [];

  constructor(
    public fb: FormBuilder,
    private chatsService: ChatsService,
  ) {
    this.newMessageForm = this.fb.group({
      'text': ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.chatsService.getChat(this.chatKey)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.chat = res;
        }
    )
    // this.scrollToBottom();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public scrollToBottom() {
    setTimeout(() => {
      var object = document.getElementById("messages");
      object.scrollTop = object.scrollHeight;
    }, 10);
  }

  public onSubmit(cf) {
    // console.log(cf);
    let data = {
      sender: this.sender,
      text: cf['text'],
      date: new Date().toString().slice(4, 15),
      time: new Date().toString().slice(16, 21)
    }
    this.chatsService.addMessageToChat(this.chatKey, data)
    .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.chat = res;
        }
    )
    this.newMessageForm.patchValue({
      'text': ''
    })
    this.scrollToBottom();
  } 

}
