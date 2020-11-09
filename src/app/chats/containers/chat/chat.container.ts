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
  
  public messageEdit = false;
  public indexEdittingMessage: number = null;
  public editMessageForm: FormGroup;

  public chat = [];

  constructor(
    public fb: FormBuilder,
    private chatsService: ChatsService,
  ) {
    this.newMessageForm = this.fb.group({
      'text': ['']
    });
    this.editMessageForm = this.fb.group({
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

  public deleteMessage(index) {
    this.chatsService.removeMessageFromChat(this.chatKey, index)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.chat = res;
        }
    )
    this.scrollToBottom();
  }

  public editMessage(index) {
    this.messageEdit = true;
    this.indexEdittingMessage = index;
    this.editMessageForm.patchValue({
      text: this.chat[index].text
    })
  }

  public closeEdit() {
    this.messageEdit = false;
    this.indexEdittingMessage = null;
    this.editMessageForm.patchValue({
      'text': ''
    })
  }

  public onSubmitEditMessage(cf) {
    console.log(cf)
    this.chatsService.editMessageInChat(
      this.chatKey, 
      this.indexEdittingMessage, 
      cf['text']
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.chat = res;
        }
    )
    this.closeEdit();
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
