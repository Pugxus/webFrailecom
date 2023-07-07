import { Component } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  user: any;
  ngOnInit() {
    this.user = GlobalComponent.user;
}
}
