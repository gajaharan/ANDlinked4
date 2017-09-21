import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {validateForm} from "../../shared/validators/valiateForm";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  authState: firebase.User;


  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.form.value.email = 'admin@gajaharan.com';
    this.form.value.password = 'Password1';
  }

  ngOnInit() {
  }


  login() {
    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
          authState => this.authState = authState,
          null,
          () => {
            this.router.navigate(['/profile', this.authState.uid]);
          });
    this.form.value.email = this.form.value.password = '';
  }

  isErrorVisible(field: string, error: string) {
    return validateForm(this.form,field, error);
  }
}
