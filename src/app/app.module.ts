import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routableComponents, AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfileFormComponent} from "./profile/profile-form/profile-form.component";
import {HomeComponent} from "./core/home/home.component";
import {NavBarComponent} from "./core/navbar/navbar.component";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./shared/user.service";

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    LoginComponent,
    RegisterComponent,
    ProfileFormComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
