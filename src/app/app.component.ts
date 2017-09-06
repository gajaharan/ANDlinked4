import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ANDlinked app works!';

  // constructor(_angularFire: AngularFireModule) {
  //   console.log(_angularFire);
  // }
}
