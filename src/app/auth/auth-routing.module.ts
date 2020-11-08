import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterContainer } from "./containers/register/register.container";
import { LoginContainer } from "./containers/login/login.container";
import { AuthView } from "./views/auth/auth.view";

const routes: Routes = [
  {
    path: '',
    component: AuthView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginContainer,
      },
      {
        path: 'register',
        component: RegisterContainer,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
