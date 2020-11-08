import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInGuard } from './shared/guards/sign-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'chats',
    canActivate: [SignInGuard],
    loadChildren: () => import('./chats/chats.module').then((m) => m.ChatsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    SignInGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
