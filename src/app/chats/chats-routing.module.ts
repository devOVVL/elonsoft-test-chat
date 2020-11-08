import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsView } from "./views/chats/chats.view";

const routes: Routes = [
  {
    path: '',
    component: ChatsView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
