import {Component, OnInit, OnChanges} from '@angular/core';
import {AuthInfo} from "../../auth/auth-info";
import {User} from "../../shared/models/user";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  authInfo: AuthInfo;
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  ngOnChanges() {
    //this.authService.authInfo$.subscribe(user => this.user = user);
  }

  getCurrentLoggedUser() {
    this.authService.getCurrentLoggedUser();
  }


  logout() {
    this.authService.logout();
  }

}
