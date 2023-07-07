import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authenticationService: AuthenticationService,

    private router: Router, @Inject(DOCUMENT) private document: Document) {

  }
  ngOnInit(): void {

    this.document.body.classList.add('bg-gradient-primary');

  }
  onRegister(form: any): void {

    this.authenticationService.register(form.value).subscribe(

      (res) => {

        localStorage.setItem('accessToken', JSON.parse(JSON.stringify(res)).accessToken);

        this.router.navigateByUrl('/login');

      }

    );

  }
}
