import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { SignInGuard } from './shared/guards/sign-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chats',
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
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
    AuthGuard,
    SignInGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
