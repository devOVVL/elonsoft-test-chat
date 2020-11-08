import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsView } from './views/chats/chats.view';


@NgModule({
  declarations: [ChatsView],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedModule,
  ]
})
export class ChatsModule { }
