import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {Subject, BehaviorSubject} from "rxjs";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {UserService} from "../shared/user.service";

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  user: User;
  user$: Observable<User> = Observable.empty<User>();
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private userService: UserService) {
  }

  register(email: string, password: string) {
    const subject = new Subject<any>();
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.saveUserData(value, subject);
      })
      .catch(err => {
        this.authInfo$.error(err);
        const subject = new Subject<any>();
        subject.error(err);
        subject.complete();
        console.log('Something went wrong:',err.message);

      });

    return subject.asObservable();
  }

  login(email: string, password: string): Observable<firebase.User> {
    const subject = new Subject<any>();
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.saveUserData(value, subject);
      })
      .catch(err => {

        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
        console.log('Something went wrong:',err.message);
      });

    return subject.asObservable();
  }

  saveUserData(value, subject) {
    let authInfo;
    if (value != null) {
      authInfo = new AuthInfo(value.uid);
      this.authInfo$.next(authInfo);
    }

    subject.next(value);
    subject.complete();
    this.user$ = this.userService.findUserbyUid(authInfo.getUid());

    this.findUserbyUid(authInfo.getUid());

    console.log('Nice, it worked!', value);
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }

  private findUserbyUid(authId: string) {
    this.userService.findUserbyUid(authId)
    .subscribe(user => this.user = user);
  }

  getCurrentLoggedUser() {
    return this.user;
  }

}
