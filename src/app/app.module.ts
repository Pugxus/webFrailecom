import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { animalComponent } from './components/animal/animal.component';
import { UserComponent } from './components/user/user.component';
import { WorkshiftComponent } from './components/workshift/workshift.component';

@NgModule({
  declarations: [
    AppComponent,
    animalComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    WelcomeComponent,
    UserComponent,
    WorkshiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center",
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }