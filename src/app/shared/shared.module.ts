import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthService } from './services/auth.service';
import { ChatsService } from './services/chats.service';

@NgModule({
  declarations: [],
  providers: [
    AuthService,
    ChatsService,
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
