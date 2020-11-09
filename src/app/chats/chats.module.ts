import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsView } from './views/chats/chats.view';
import { ChatsListContainer } from './containers/chats-list/chats-list.container';


@NgModule({
  declarations: [ChatsView, ChatsListContainer],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class ChatsModule { }
