import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  rol: any = 0

  ngOnInit(): void {
    this.rol= localStorage.getItem("rol")
  }

  constructor(private router: Router) {

  }

  logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")
    this.router.navigate([""])
  }

}
