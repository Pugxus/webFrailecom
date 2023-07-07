import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService,

    private router: Router) {
  }

  onLogin(form: any): void {

    this.authenticationService.login(form.value).subscribe(

      (res) => {

        localStorage.setItem('accessToken', JSON.parse(JSON.stringify(res)).accessToken);
        localStorage.setItem("username", JSON.parse(JSON.stringify(res)).user.usuario);
        localStorage.setItem("rol", JSON.parse(JSON.stringify(res)).user.rol);
        this.router.navigateByUrl('/user');
      }
    );
  }
}