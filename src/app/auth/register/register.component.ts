import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  authState: firebase.User;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {

    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });


  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }

  signUp() {
    const val = this.form.value;

    this.authService.register(val.email, val.password)
      .subscribe(
          authState => this.authState = authState,
          null,
          () => {
            //alert('User created successfully !');
            this.register(this.authState.uid, val.firstname, val.lastname, val.email);
          }
      );
  }

  register(uid, firstname, lastname, email) {
    this.userService.registerd(uid, firstname, lastname, email)
      .subscribe(
        () => {
          this.router.navigate(['/profile', this.authState.uid]);
        },
        err => alert(`error creating lesson ${err}`)
      );
  }


}
