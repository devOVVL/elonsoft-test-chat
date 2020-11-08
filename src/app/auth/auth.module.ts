import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainer } from './containers/login/login.container';
import { AuthView } from './views/auth/auth.view';
import { RegisterContainer } from './containers/register/register.container';


@NgModule({
  declarations: [LoginContainer, AuthView, RegisterContainer],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
