import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../../shared/services/chats.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.container.html',
  styleUrls: ['./chats-list.container.scss']
})
export class ChatsListContainer implements OnInit {

  public newChatForm: FormGroup;
  private _destroy$ = new Subject<void>();
  public chatsList = [];
  public clickOnAdd = false;

  constructor(
    public fb: FormBuilder,
    private chatsService: ChatsService,
  ) {
    this.chatsService.getChatsKeys()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        res => {
          this.chatsList = res;
        }
    )
    this.newChatForm = this.fb.group({
      'name': ['', Validators.required ]
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
    this.chatsService.addNewChat(
      cf['name']
    )
      .subscribe(
        res => {
          this.chatsList = res;
        }
    )
    this.clickOnAdd = false;
  } 

}
